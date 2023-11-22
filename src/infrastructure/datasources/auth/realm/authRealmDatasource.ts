import IAuthFailure from 'domain/core/failures/auth/authFailure';
import { fromChangePasswordFailureRealmMapper, fromGetUserAuthenticatedFailureRealmMapper, fromSendCodeSecurityFailureRealmMapper, fromSetCodeSecurityFailureRealmMapper, fromSignUpUserFailureRealmMapper, fromUpdateUserEmailVerifiedFailureRealmMapper } from 'domain/mappers/failures/auth/realm/authRealmFailuresMapper';
import { app, CLUSTER_NAME, DATABASE_NAME, getCurrentUser } from 'infrastructure/config/mongo-realm/app';
import IAuthRepository from 'infrastructure/repositories/auth/authRepository';
import nookies from 'nookies';
import * as Realm from "realm-web";
import { fromSignInUserFailureRealmMapper } from 'domain/mappers/failures/auth/realm/authRealmFailuresMapper';
import { IUser } from 'domain/core/entities/userEntity';
import { userRealmDataToEntity } from 'domain/mappers/user/realm/userRealmMapper';
import { customAlphabet } from 'nanoid';
import { getTokenMessaging } from 'infrastructure/config/firebase/firebase-client';
import bcrypt from "bcryptjs";
import { ITeacher } from 'domain/core/entities/teacherEntity';
import { teacherRealmDataToEntity } from 'domain/mappers/teacher/realm/teacherRealmMapper';
import { IAdmin } from 'domain/core/entities/adminEntity';
import { adminRealmDataToEntity } from 'domain/mappers/admin/realm/adminRealmMapper';

export default class AuthRealmDatasource implements IAuthRepository {
  async signInUser(obj: {
    email: string;
    password: string;
  }): Promise<boolean | IAuthFailure> {
    try {
      const credentials = Realm.Credentials.emailPassword(obj.email, obj.password);
      const user = await app.logIn(credentials);

      const mongo = user.mongoClient(CLUSTER_NAME);
      const collectionUser = mongo.db(DATABASE_NAME).collection("Users");

      const dataUser = await collectionUser.findOne({ _id: user.id });

      let userMap: IUser;

      if (dataUser) {
        await collectionUser.updateOne(
          { _id: user.id },
          { $set: { lastSessionAt: new Date() } }
        );  

        userMap = userRealmDataToEntity(dataUser);
      }

      nookies.set(undefined, 'token', user.accessToken ?? "", { path: '/' });
      nookies.set(undefined, 'role', "user", { path: '/' });
      nookies.set(undefined, 'userId', user.id ?? "", { path: '/' });

      return true;
    } catch (error: any) {
      return fromSignInUserFailureRealmMapper(error.error);
    }
  }

  async signUpUser(obj: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<boolean | IAuthFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Users");

      const email = await collection.findOne({ email: obj.email });

      if (email) throw new Error("name already in use");

      await app.emailPasswordAuth.registerUser({ email: obj.email, password: obj.password });

      const credentials = Realm.Credentials.emailPassword(obj.email, obj.password);
      const user = await app.logIn(credentials);

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(obj.password, salt);

      await collection.insertOne({
        _id: user.id,
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        provider: "email",
        createdAt: new Date(),
        updatedAt: null,
        emailVerifiedAt: null,
        password: hash,
        lastSessionAt: new Date(),
      });

      nookies.set(undefined, 'token', user.accessToken ?? "", { path: '/' });
      nookies.set(undefined, 'userId', user.id ?? "", { path: '/' });

      return true;
    } catch (error: any) {
      return fromSignUpUserFailureRealmMapper(error.error ?? error.message);
    }
  }

  async signInTeacher(obj: {
    email: string;
    password: string;
  }): Promise<boolean | IAuthFailure> {
    try {
      const currentUser = app.currentUser;

      if (!currentUser) throw new Error("invalid user-not-found");

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Teachers");

      const data = await collection.count({ email: obj.email });

      if (data === 0) throw new Error("invalid username/password");

      const credentials = Realm.Credentials.emailPassword(obj.email, obj.password);
      const user = await app.logIn(credentials);

      let teacherMap: ITeacher;

      if (data) {
        await collection.updateOne(
          { _id: user.id },
          { $set: { lastSessionAt: new Date() } }
        );  

        teacherMap = teacherRealmDataToEntity(data);
      }

      nookies.set(undefined, 'token', user.accessToken ?? "", { path: '/' });
      nookies.set(undefined, 'role', "teacher", { path: '/' });
      nookies.set(undefined, 'userId', user.id ?? "", { path: '/' });

      return true;
    } catch (error: any) {
      return fromSignInUserFailureRealmMapper(error.error ?? error.message);
    }
  }

  async signInAdmin(obj: {
    email: string;
    password: string;
  }): Promise<boolean | IAuthFailure> {
    try {
      const currentUser = app.currentUser;

      if (!currentUser) throw new Error("invalid admin-not-found");

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Admins");

      const userCount = await collection.count({ email: obj.email });

      if (userCount === 0) throw new Error("invalid username/password");

      const credentials = Realm.Credentials.emailPassword(obj.email, obj.password);
      const user = await app.logIn(credentials);

      await collection.updateOne(
        { _id: user.id },
        { $set: { lastSessionAt: new Date() } }
      );  

      nookies.set(undefined, 'token', user.accessToken ?? "", { path: '/' });
      nookies.set(undefined, 'role', "admin", { path: '/' });

      return true;
    } catch (error: any) {
      return fromSignInUserFailureRealmMapper(error.error ?? error.message);
    }
  }

  async getUserAuthenticated(): Promise<IUser | IAuthFailure> {
    try {
      const currentUser = app.currentUser;

      if (!currentUser) throw new Error("invalid user-not-found");

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Users");

      const data = await collection.findOne({ _id: currentUser.id });

      if (!data) throw new Error("invalid user-not-found");

      const userMap: IUser = userRealmDataToEntity(data)

      const currentMessagingToken = await getTokenMessaging();

      if (currentMessagingToken === "error") {
        await collection.updateOne(
          { _id: currentUser.id },
          { $set: { messagingToken: "" } }
        );
      } else {
        await collection.updateOne(
          { _id: currentUser.id },
          { $set: { messagingToken: currentMessagingToken } }
        );
      }

      nookies.set(undefined, 'token', currentUser.accessToken ?? "", { path: '/' });
      nookies.set(undefined, 'userId', currentUser.id ?? "", { path: '/' });

      return userMap;
    } catch (error: any) {
      return fromGetUserAuthenticatedFailureRealmMapper(error.error);
    }
  }

  async getTeacherAuthenticated(): Promise<ITeacher | IAuthFailure> {
    try {
      const currentUser = app.currentUser;

      if (!currentUser) throw new Error("invalid user-not-found");

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Teachers");

      const data = await collection.findOne({ _id: currentUser.id });

      if (!data) throw new Error("invalid user-not-found");

      const teacherMap: ITeacher = teacherRealmDataToEntity(data)

      const currentMessagingToken = await getTokenMessaging();

      if (currentMessagingToken === "error") {
        await collection.updateOne(
          { _id: currentUser.id },
          { $set: { messagingToken: "" } }
        );
      } else {
        await collection.updateOne(
          { _id: currentUser.id },
          { $set: { messagingToken: currentMessagingToken } }
        );
      }

      nookies.set(undefined, 'token', currentUser.accessToken ?? "", { path: '/' });
      nookies.set(undefined, 'role', "teacher", { path: '/' });
      nookies.set(undefined, 'userId', currentUser.id ?? "", { path: '/' });

      return teacherMap;
    } catch (error: any) {
      return fromGetUserAuthenticatedFailureRealmMapper(error.error);
    }
  }

  async getAdminAuthenticated(): Promise<IAdmin | IAuthFailure> {
    try {
      const currentUser = app.currentUser;

      if (!currentUser) throw new Error("invalid admin-not-found");

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Admins");

      const data = await collection.findOne({ _id: currentUser.id });

      if (!data) throw new Error("invalid admin-not-found");

      const adminMap: IAdmin = adminRealmDataToEntity(data);

      const currentMessagingToken = await getTokenMessaging();

      await collection.updateOne(
        { _id: currentUser.id },
        { $set: { messagingToken: currentMessagingToken } }
      );

      nookies.set(undefined, 'token', currentUser.accessToken ?? "", { path: '/' });
      nookies.set(undefined, 'role', "admin", { path: '/' });

      return adminMap;
    } catch (error: any) {
      return fromGetUserAuthenticatedFailureRealmMapper(error.error);
    }
  }

  async signOutUser(): Promise<boolean | IAuthFailure> {
    try {
      await app.currentUser?.logOut();

      nookies.set(undefined, 'token', '', { path: '/' });
      nookies.set(undefined, 'role', '', { path: '/' });
      nookies.set(undefined, 'userId', '', { path: '/' });

      return true;
    } catch (error: any) {
      return fromSignInUserFailureRealmMapper(error.error);
    }
  }

  async signInUserWithGoogle(): Promise<boolean | IAuthFailure> {
    try {
      const redirectUri = window.location.origin + "/oauth2/auth";
      const credentials = Realm.Credentials.google(redirectUri);
      const user = await app.logIn(credentials);

      const mongo = user.mongoClient(CLUSTER_NAME);
      const collectionUsers = mongo.db(DATABASE_NAME).collection("Users");

      const userCount = await collectionUsers.count({ email: user.profile.email, provider: "google" });

      if (userCount > 0) {
        await collectionUsers.updateOne(
          { _id: user.id },
          { $set: { lastSessionAt: new Date() } }
        );  

        nookies.set(undefined, 'token', user.accessToken ?? "", { path: '/' });
      } else {
        await app.deleteUser(app.currentUser!);
        await app.currentUser?.logOut();

        nookies.set(undefined, 'token', '', { path: '/' });

        throw new Error("invalid username/password");
      }

      return true;
    } catch (error: any) {
      return fromSignInUserFailureRealmMapper(error.error ?? error.message);
    }
  }

  async signUpWithGoogleUser(): Promise<string | IAuthFailure> {
    try {
      const redirectUri = window.location.origin + "/oauth2/auth";
      const credentials = Realm.Credentials.google(redirectUri);
      const user = await app.logIn(credentials);

      const mongo = user.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Users");

      const creator = await collection.count({ email: user.profile.email });

      if (creator > 0) throw new Error("name already in use");

      await collection.insertOne({
        _id: user.id,
        firstName: user.profile.firstName,
        profilePictureUrl: user.profile.pictureUrl,
        email: user.profile.email,
        provider: "google",
        createdAt: new Date(),
        updatedAt: null,
        emailVerifiedAt: new Date(),
        lastSessionAt: new Date(),
      });

      nookies.set(undefined, 'token', user.accessToken ?? "", { path: '/' });
      nookies.set(undefined, 'userId', user.id ?? "", { path: '/' });

      return user.profile.email ?? "";
    } catch (error: any) {
      await app.currentUser?.logOut();

      nookies.set(undefined, 'token', '', { path: '/' });
      nookies.set(undefined, 'userId', '', { path: '/' });

      return fromSignUpUserFailureRealmMapper(error.error ?? error.message);
    }
  }

  async createUserWithGoogle(): Promise<boolean | IAuthFailure> {
    try {
      Realm.handleAuthRedirect();
    
      return true;
    } catch (error: any) {
      return fromSignUpUserFailureRealmMapper(error.error);
    }
  }

  async changePassword(obj: { email?: string; password: string }): Promise<boolean | IAuthFailure> {
    try {
      const currentUser = await getCurrentUser();

      app.emailPasswordAuth.callResetPasswordFunction({ email: obj.email ?? currentUser.profile.email ?? "", password: obj.password });

      return true;
    } catch (error: any) {
      return fromChangePasswordFailureRealmMapper(error.error);
    }
  }

  async setCodeSecurity(obj: { email: string }): Promise<string | IAuthFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collectionUsers = mongo.db(DATABASE_NAME).collection("Users");

      const user = await collectionUsers.count({ email: obj.email });

      const date = new Date();
      const codeSecurityExpireAt: number = date.setTime(date.getTime() + 1 * 60 * 60 * 1000);

      const nanoid = customAlphabet('1234567890', 10)(4).toString();

      if (user > 0) {
        await collectionUsers.updateOne(
          { email: obj.email },
          { $set: { codeSecurity: nanoid, codeSecurityExpireAt: codeSecurityExpireAt } }
        );
      }

      return nanoid;
    } catch (error: any) {
      return fromSetCodeSecurityFailureRealmMapper(error.error);
    }
  }

  async confirmCodeSecurity(obj: { email: string, codeSecurity: string }): Promise<boolean | IAuthFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collectionUsers = mongo.db(DATABASE_NAME).collection("Users");

      const user = await collectionUsers.count({ email: obj.email, codeSecurity: obj.codeSecurity, codeSecurityExpireAt: { $gte: new Date().getTime() } });

      if (user === 0) throw new Error("code expired");
      
      return true;
    } catch (error: any) {
      return fromSendCodeSecurityFailureRealmMapper(error.error ?? error.message);
    }
  }

  async updateUserEmailVerified(obj: { email: string }): Promise<boolean | IAuthFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collectionUsers = mongo.db(DATABASE_NAME).collection("Users");

      const user = await collectionUsers.count({ email: obj.email });

      if (user > 0) {
        await collectionUsers.updateOne(
          { email: obj.email },
          { $set: { emailVerified: true, emailVerifiedAt: new Date() } }
        );
      }

      return true;
    } catch (error: any) {
      return fromUpdateUserEmailVerifiedFailureRealmMapper(error.error ?? error.message);
    }
  }
}
