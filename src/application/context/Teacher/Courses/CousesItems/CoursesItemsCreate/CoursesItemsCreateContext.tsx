import { createContext, Dispatch, useMemo, useReducer } from "react";
import {
  actions,
  ICoursesItemsCreateActions,
} from "./CoursesItemsCreateActions";
import { CoursesItemsCreateReducer } from "./CoursesItemsCreateReducer";
import {
  ICoursesItemsCreateState,
  initialState,
} from "./CoursesItemsCreateState";

export interface ICoursesItemsCreateContext {
  state: ICoursesItemsCreateState;
  actions: ICoursesItemsCreateActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const CoursesItemsCreateContext =
  createContext<ICoursesItemsCreateContext>({} as ICoursesItemsCreateContext);

const CoursesItemsCreateProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(CoursesItemsCreateReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <CoursesItemsCreateContext.Provider value={values}>
      {children}
    </CoursesItemsCreateContext.Provider>
  );
};

export default CoursesItemsCreateProvider;
