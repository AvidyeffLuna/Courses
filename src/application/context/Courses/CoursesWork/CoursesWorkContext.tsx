import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, ICoursesWorkActions } from "./CoursesWorkActions";
import { CoursesWorkReducer } from "./CoursesWorkReducer";
import { ICoursesWorkState, initialState } from "./CoursesWorkState";

export interface ICoursesWorkContext {
  state: ICoursesWorkState;
  actions: ICoursesWorkActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const CoursesWorkContext = createContext<ICoursesWorkContext>(
  {} as ICoursesWorkContext
);

const CoursesWorkProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(CoursesWorkReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <CoursesWorkContext.Provider value={values}>
      {children}
    </CoursesWorkContext.Provider>
  );
};

export default CoursesWorkProvider;
