import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, IUsersListActions } from "./UsersListActions";
import { UsersListReducer } from "./UsersListReducer";
import { IUsersListState, initialState } from "./UsersListState";

export interface IUsersListContext {
  state: IUsersListState;
  actions: IUsersListActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const UsersListContext = createContext<IUsersListContext>(
  {} as IUsersListContext
);

const UsersListProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(UsersListReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <UsersListContext.Provider value={values}>
      {children}
    </UsersListContext.Provider>
  );
};

export default UsersListProvider;
