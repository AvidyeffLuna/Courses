import { IAdmin } from 'domain/core/entities/adminEntity';
import { ITeacher } from 'domain/core/entities/teacherEntity';
import { IUser } from 'domain/core/entities/userEntity';
import AuthRealmDatasource from 'infrastructure/datasources/auth/realm/authRealmDatasource';

export default class AuthUseCases {
  private _repository: AuthRealmDatasource = new AuthRealmDatasource();

  async signInUser(obj: { email: string; password: string }): Promise<boolean> {
    try {
      const response = await this._repository.signInUser({email: obj.email, password: obj.password});

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async signInTeacher(obj: { email: string; password: string }): Promise<boolean> {
    try {
      const response = await this._repository.signInTeacher({email: obj.email, password: obj.password});

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async signInAdmin(obj: { email: string; password: string }): Promise<boolean> {
    try {
      const response = await this._repository.signInAdmin({email: obj.email, password: obj.password});

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async signUpUser(obj: { firstName: string; lastName: string; email: string; password: string; }): Promise<boolean> {
    try {
      const response = await this._repository.signUpUser({
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        password: obj.password,
      });

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async signOutUser(): Promise<boolean> {
    try {
      const response = await this._repository.signOutUser();

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserAuthenticated(): Promise<IUser> {
    try {
      const response = await this._repository.getUserAuthenticated();

      if ('code' in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getTeacherAuthenticated(): Promise<ITeacher> {
    try {
      const response = await this._repository.getTeacherAuthenticated();

      if ('code' in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAdminAuthenticated(): Promise<IAdmin> {
    try {
      const response = await this._repository.getAdminAuthenticated();

      if ('code' in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async signInUserWithGoogle(): Promise<boolean> {
    try {
      const response = await this._repository.signInUserWithGoogle();

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async signUpWithGoogleUser(): Promise<string> {
    try {
      const response = await this._repository.signUpWithGoogleUser();

      if (typeof response !== "string") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createUserWithGoogle(): Promise<boolean> {
    try {
      const response = await this._repository.createUserWithGoogle();

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(obj: { email?: string; password: string }): Promise<boolean> {
    try {
      const response = await this._repository.changePassword({ email: obj.email, password: obj.password });

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async setCodeSecurity(obj: { email: string; }): Promise<string> {
    try {
      const response = await this._repository.setCodeSecurity({ email: obj.email });

      if (typeof response !== "string") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async confirmCodeSecurity(obj: { email: string; codeSecurity: string }): Promise<boolean> {
    try {
      const response = await this._repository.confirmCodeSecurity({ email: obj.email, codeSecurity: obj.codeSecurity });

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateUserEmailVerified(obj: { email: string; }): Promise<boolean> {
    try {
      const response = await this._repository.updateUserEmailVerified({ email: obj.email });

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
