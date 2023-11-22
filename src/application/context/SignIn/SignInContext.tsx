import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, ISignInActions } from "./SignInActions";
import { SignInReducer } from "./SignInReducer";
import { ISignInState, initialState } from "./SignInState";

export interface ISignInContext {
  state: ISignInState;
  actions: ISignInActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element[];
}

export const SignInContext = createContext<ISignInContext>(
  {} as ISignInContext
);

const SignInProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(SignInReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <SignInContext.Provider value={values}>{children}</SignInContext.Provider>
  );
};

export default SignInProvider;
