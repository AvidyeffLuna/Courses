import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, IShoppingCartActions } from "./ShoppingCartActions";
import { ShoppingCartReducer } from "./ShoppingCartReducer";
import { IShoppingCartState, initialState } from "./ShoppingCartState";

export interface IShoppingCartContext {
  state: IShoppingCartState;
  actions: IShoppingCartActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const ShoppingCartContext = createContext<IShoppingCartContext>(
  {} as IShoppingCartContext
);

const ShoppingCartProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(ShoppingCartReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <ShoppingCartContext.Provider value={values}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
