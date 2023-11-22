import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, ICoursesCreateActions } from "./CoursesCreateActions";
import { CoursesCreateReducer } from "./CoursesCreateReducer";
import { ICoursesCreateState, initialState } from "./CoursesCreateState";

export interface ICoursesCreateContext {
  state: ICoursesCreateState;
  actions: ICoursesCreateActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const CoursesCreateContext = createContext<ICoursesCreateContext>(
  {} as ICoursesCreateContext
);

const CoursesCreateProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(CoursesCreateReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <CoursesCreateContext.Provider value={values}>
      {children}
    </CoursesCreateContext.Provider>
  );
};

export default CoursesCreateProvider;
