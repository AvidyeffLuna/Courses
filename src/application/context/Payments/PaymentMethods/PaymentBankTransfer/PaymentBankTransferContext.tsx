import { createContext, Dispatch, useMemo, useReducer } from "react";
import {
  actions,
  IPaymentBankTransferActions,
} from "./PaymentBankTransferActions";
import { PaymentBankTransferReducer } from "./PaymentBankTransferReducer";
import {
  IPaymentBankTransferState,
  initialState,
} from "./PaymentBankTransferState";

export interface IPaymentBankTransferContext {
  state: IPaymentBankTransferState;
  actions: IPaymentBankTransferActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const PaymentBankTransferContext =
  createContext<IPaymentBankTransferContext>({} as IPaymentBankTransferContext);

const PaymentBankTransferProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    PaymentBankTransferReducer,
    initialState
  );

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <PaymentBankTransferContext.Provider value={values}>
      {children}
    </PaymentBankTransferContext.Provider>
  );
};

export default PaymentBankTransferProvider;
