import { createContext, Dispatch, useMemo, useReducer } from "react";
import { actions, INotificationsActions } from "./NotificationsActions";
import { NotificationsReducer } from "./NotificationsReducer";
import { INotificationsState, initialState } from "./NotificationsState";

export interface INotificationsContext {
  state: INotificationsState;
  actions: INotificationsActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const NotificationsContext = createContext<INotificationsContext>(
  {} as INotificationsContext
);

const NotificationsProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(NotificationsReducer, initialState);

  const values = useMemo(() => ({ state, actions, dispatch }), [state]);

  return (
    <NotificationsContext.Provider value={values}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
