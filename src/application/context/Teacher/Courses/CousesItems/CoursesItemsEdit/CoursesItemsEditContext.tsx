import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, ICoursesItemsEditActions } from "./CoursesItemsEditActions";
import { CoursesItemsEditReducer } from "./CoursesItemsEditReducer";
import { ICoursesItemsEditState, initialState } from "./CoursesItemsEditState";

export interface ICoursesItemsEditContext {
  state: ICoursesItemsEditState;
  actions: ICoursesItemsEditActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const CoursesItemsEditContext = createContext<ICoursesItemsEditContext>(
  {} as ICoursesItemsEditContext
);

const CoursesItemsEditProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(CoursesItemsEditReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <CoursesItemsEditContext.Provider value={values}>
      {children}
    </CoursesItemsEditContext.Provider>
  );
};

export default CoursesItemsEditProvider;
