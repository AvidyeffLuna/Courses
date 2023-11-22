import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, ICoursesListActions } from "./CoursesListActions";
import { CoursesListReducer } from "./CoursesListReducer";
import { ICoursesListState, initialState } from "./CoursesListState";

export interface ICoursesListContext {
  state: ICoursesListState;
  actions: ICoursesListActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const CoursesListContext = createContext<ICoursesListContext>(
  {} as ICoursesListContext
);

const CoursesListProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(CoursesListReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <CoursesListContext.Provider value={values}>
      {children}
    </CoursesListContext.Provider>
  );
};

export default CoursesListProvider;
