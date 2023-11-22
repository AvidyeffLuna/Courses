import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, ICoursesViewActions } from "./CoursesViewActions";
import { CoursesViewReducer } from "./CoursesViewReducer";
import { ICoursesViewState, initialState } from "./CoursesViewState";

export interface ICoursesViewContext {
  state: ICoursesViewState;
  actions: ICoursesViewActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const CoursesViewContext = createContext<ICoursesViewContext>(
  {} as ICoursesViewContext
);

const CoursesViewProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(CoursesViewReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <CoursesViewContext.Provider value={values}>
      {children}
    </CoursesViewContext.Provider>
  );
};

export default CoursesViewProvider;
