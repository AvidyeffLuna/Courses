import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, IDashboardActions } from "./DashboardActions";
import { DashboardReducer } from "./DashboardReducer";
import { IDashboardState, initialState } from "./DashboardState";

export interface IDashboardContext {
  state: IDashboardState;
  actions: IDashboardActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const DashboardContext = createContext<IDashboardContext>(
  {} as IDashboardContext
);

const DashboardProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
