import { createContext, Dispatch, useMemo, useReducer } from "react";
import {
  actions,
  ICoursesLessonsCreateActions,
} from "./CoursesLessonsCreateActions";
import { CoursesLessonsCreateReducer } from "./CoursesLessonsCreateReducer";
import {
  ICoursesLessonsCreateState,
  initialState,
} from "./CoursesLessonsCreateState";

export interface ICoursesLessonsCreateContext {
  state: ICoursesLessonsCreateState;
  actions: ICoursesLessonsCreateActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const CoursesLessonsCreateContext =
  createContext<ICoursesLessonsCreateContext>(
    {} as ICoursesLessonsCreateContext
  );

const CoursesLessonsCreateProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    CoursesLessonsCreateReducer,
    initialState
  );

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <CoursesLessonsCreateContext.Provider value={values}>
      {children}
    </CoursesLessonsCreateContext.Provider>
  );
};

export default CoursesLessonsCreateProvider;
