import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, IPaymentMobileActions } from "./PaymentMobileActions";
import { PaymentMobileReducer } from "./PaymentMobileReducer";
import { IPaymentMobileState, initialState } from "./PaymentMobileState";

export interface IPaymentMobileContext {
  state: IPaymentMobileState;
  actions: IPaymentMobileActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const PaymentMobileContext = createContext<IPaymentMobileContext>(
  {} as IPaymentMobileContext
);

const PaymentMobileProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(PaymentMobileReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <PaymentMobileContext.Provider value={values}>
      {children}
    </PaymentMobileContext.Provider>
  );
};

export default PaymentMobileProvider;
