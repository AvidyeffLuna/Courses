/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  Dispatch,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { actions, IAuthActions } from "application/context/Auth/AuthActions";
import { AuthReducer } from "application/context/Auth/AuthReducer";
import { IAuthState, initialState } from "application/context/Auth/AuthState";
import { parseCookies } from "nookies";
import { UserRolesEnum } from "presentation/enum/user/userRolesEnum";

export interface IAuthContext {
  state: IAuthState;
  actions: IAuthActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const onCheckAuthentication = useCallback(() => {
    const cookies = parseCookies();
    const { role } = cookies;

    switch (role) {
      case UserRolesEnum.User:
        actions.getUserAuthenticated(state.user ? false : true)(dispatch);
        break;
      case UserRolesEnum.Teacher:
        actions.getTeacherAuthenticated(state.teacher ? false : true)(dispatch);
        break;
      case UserRolesEnum.Admin:
        actions.getAdminAuthenticated(state.admin ? false : true)(dispatch);
        break;

      default:
        actions.getUserAuthenticated(state.user ? false : true)(dispatch);
    }
  }, []);

  useEffect(() => {
    onCheckAuthentication();
  }, [onCheckAuthentication]);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
