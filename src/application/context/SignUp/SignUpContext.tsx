import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, ISignUpActions } from "./SignUpActions";
import { SignUpReducer } from "./SignUpReducer";
import { ISignUpState, initialState } from "./SignUpState";

export interface ISignUpContext {
  state: ISignUpState;
  actions: ISignUpActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element[];
}

export const SignUpContext = createContext<ISignUpContext>(
  {} as ISignUpContext
);

const SignUpProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(SignUpReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <SignUpContext.Provider value={values}>{children}</SignUpContext.Provider>
  );
};

export default SignUpProvider;
