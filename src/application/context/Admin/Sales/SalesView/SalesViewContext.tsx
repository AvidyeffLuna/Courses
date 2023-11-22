import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, ISalesViewActions } from "./SalesViewActions";
import { SalesViewReducer } from "./SalesViewReducer";
import { ISalesViewState, initialState } from "./SalesViewState";

export interface ISalesViewContext {
  state: ISalesViewState;
  actions: ISalesViewActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const SalesViewContext = createContext<ISalesViewContext>(
  {} as ISalesViewContext
);

const SalesViewProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(SalesViewReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <SalesViewContext.Provider value={values}>
      {children}
    </SalesViewContext.Provider>
  );
};

export default SalesViewProvider;
