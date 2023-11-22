import { IAdmin } from 'domain/core/entities/adminEntity';
import { ITeacher } from 'domain/core/entities/teacherEntity';
import { IUser } from 'domain/core/entities/userEntity';
import IAuthFailure from 'domain/core/failures/auth/authFailure';

export default interface IAuthRepository {
  signInUser(obj: { email: string; password: string; }): Promise<boolean | IAuthFailure>;
  signInTeacher(obj: { email: string; password: string; }): Promise<boolean | IAuthFailure>;
  signUpUser(obj: { firstName: string; lastName: string; email: string; password: string; }): Promise<boolean | IAuthFailure>;
  signInAdmin(obj: { email: string; password: string; }): Promise<boolean | IAuthFailure>;
  getUserAuthenticated(): Promise<IUser | IAuthFailure>;
  getAdminAuthenticated(): Promise<IAdmin | IAuthFailure>;
  getTeacherAuthenticated(): Promise<ITeacher | IAuthFailure>;
  signOutUser(): Promise<boolean | IAuthFailure>;
  signInUserWithGoogle(): Promise<boolean | IAuthFailure>;
  signUpWithGoogleUser(): Promise<string | IAuthFailure>;
  createUserWithGoogle(): Promise<boolean | IAuthFailure>;
  changePassword(obj: { email?: string | undefined; password: string }): Promise<boolean | IAuthFailure>;
  setCodeSecurity(obj: { email: string }): Promise<string | IAuthFailure>;
  confirmCodeSecurity(obj: { email: string, codeSecurity: string }): Promise<boolean | IAuthFailure>;
  updateUserEmailVerified(obj: { email: string }): Promise<boolean | IAuthFailure>;
}
