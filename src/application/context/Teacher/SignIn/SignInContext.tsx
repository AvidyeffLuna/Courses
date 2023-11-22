import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, ISignInTeacherActions } from "./SignInActions";
import { SignInTeacherReducer } from "./SignInReducer";
import { ISignInTeacherState, initialState } from "./SignInState";

export interface ISignInTeacherContext {
  state: ISignInTeacherState;
  actions: ISignInTeacherActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element[];
}

export const SignInTeacherContext = createContext<ISignInTeacherContext>(
  {} as ISignInTeacherContext
);

const SignInTeacherProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(SignInTeacherReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <SignInTeacherContext.Provider value={values}>
      {children}
    </SignInTeacherContext.Provider>
  );
};

export default SignInTeacherProvider;
