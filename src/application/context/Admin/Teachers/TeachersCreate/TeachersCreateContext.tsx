import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, ITeachersCreateActions } from "./TeachersCreateActions";
import { TeachersCreateReducer } from "./TeachersCreateReducer";
import { ITeachersCreateState, initialState } from "./TeachersCreateState";

export interface ITeachersCreateContext {
  state: ITeachersCreateState;
  actions: ITeachersCreateActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const TeachersCreateContext = createContext<ITeachersCreateContext>(
  {} as ITeachersCreateContext
);

const TeachersCreateProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(TeachersCreateReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <TeachersCreateContext.Provider value={values}>
      {children}
    </TeachersCreateContext.Provider>
  );
};

export default TeachersCreateProvider;
