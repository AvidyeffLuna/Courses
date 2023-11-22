import { AccountRoutesEnum } from "../accountRoutes";
import { AdminAccountRoutesEnum } from "../AdminRoutes/accountRoutes";
import { TeacherAccountRoutesEnum } from "../TeacherRoutes/accountRoutes";

export const unauthRoutes = [
    AccountRoutesEnum.Signin,
    AccountRoutesEnum.Signup,
    AccountRoutesEnum.RecoveryPassword
];

export const teacherUnauthRoutes = [
    TeacherAccountRoutesEnum.Signin,
];
  
export const adminUnauthRoutes = [
    AdminAccountRoutesEnum.Signin,
];
