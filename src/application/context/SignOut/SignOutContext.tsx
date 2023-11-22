import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, ISignOutActions } from "./SignOutActions";
import { SignOutReducer } from "./SignOutReducer";
import { ISignOutState, initialState } from "./SignOutState";

export interface ISignOutContext {
  state: ISignOutState;
  actions: ISignOutActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const SignOutContext = createContext<ISignOutContext>(
  {} as ISignOutContext
);

const SignOutProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(SignOutReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <SignOutContext.Provider value={values}>{children}</SignOutContext.Provider>
  );
};

export default SignOutProvider;
