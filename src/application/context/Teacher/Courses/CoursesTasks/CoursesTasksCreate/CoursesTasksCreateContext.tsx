import { createContext, Dispatch, useMemo, useReducer } from "react";
import {
  actions,
  ICoursesTasksCreateActions,
} from "./CoursesTasksCreateActions";
import { CoursesTasksCreateReducer } from "./CoursesTasksCreateReducer";
import {
  ICoursesTasksCreateState,
  initialState,
} from "./CoursesTasksCreateState";

export interface ICoursesTasksCreateContext {
  state: ICoursesTasksCreateState;
  actions: ICoursesTasksCreateActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const CoursesTasksCreateContext =
  createContext<ICoursesTasksCreateContext>({} as ICoursesTasksCreateContext);

const CoursesTasksCreateProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(CoursesTasksCreateReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <CoursesTasksCreateContext.Provider value={values}>
      {children}
    </CoursesTasksCreateContext.Provider>
  );
};

export default CoursesTasksCreateProvider;
