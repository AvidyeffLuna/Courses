import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, IAuthWithGoogleActions } from "./AuthWithGoogleActions";
import { AuthWithGoogleReducer } from "./AuthWithGoogleReducer";
import { IAuthWithGoogleStates, initialState } from "./AuthWithGoogleState";

export interface IAuthWithGoogleContext {
  state: IAuthWithGoogleStates;
  actions: IAuthWithGoogleActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthWithGoogleContext = createContext<IAuthWithGoogleContext>(
  {} as IAuthWithGoogleContext
);

const AuthWithGoogleProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(AuthWithGoogleReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <AuthWithGoogleContext.Provider value={values}>
      {children}
    </AuthWithGoogleContext.Provider>
  );
};

export default AuthWithGoogleProvider;
