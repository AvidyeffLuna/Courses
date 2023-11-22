import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, IUsersCreateActions } from "./UsersCreateActions";
import { UsersCreateReducer } from "./UsersCreateReducer";
import { IUsersCreateState, initialState } from "./UsersCreateState";

export interface IUsersCreateContext {
  state: IUsersCreateState;
  actions: IUsersCreateActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const UsersCreateContext = createContext<IUsersCreateContext>(
  {} as IUsersCreateContext
);

const UsersCreateProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(UsersCreateReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <UsersCreateContext.Provider value={values}>
      {children}
    </UsersCreateContext.Provider>
  );
};

export default UsersCreateProvider;
