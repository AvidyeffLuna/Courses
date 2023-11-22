import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, ITeachersListActions } from "./TeachersListActions";
import { TeachersListReducer } from "./TeachersListReducer";
import { ITeachersListState, initialState } from "./TeachersListState";

export interface ITeachersListContext {
  state: ITeachersListState;
  actions: ITeachersListActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const TeachersListContext = createContext<ITeachersListContext>(
  {} as ITeachersListContext
);

const TeachersListProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(TeachersListReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <TeachersListContext.Provider value={values}>
      {children}
    </TeachersListContext.Provider>
  );
};

export default TeachersListProvider;
