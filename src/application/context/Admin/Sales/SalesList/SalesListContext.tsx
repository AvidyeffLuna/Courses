import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, ISalesListActions } from "./SalesListActions";
import { SalesListReducer } from "./SalesListReducer";
import { ISalesListState, initialState } from "./SalesListState";

export interface ISalesListContext {
  state: ISalesListState;
  actions: ISalesListActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const SalesListContext = createContext<ISalesListContext>(
  {} as ISalesListContext
);

const SalesListProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(SalesListReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <SalesListContext.Provider value={values}>
      {children}
    </SalesListContext.Provider>
  );
};

export default SalesListProvider;
