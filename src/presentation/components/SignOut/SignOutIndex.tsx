import {
  ISignOutContext,
  SignOutContext,
} from "application/context/SignOut/SignOutContext";
import { useContext, useEffect } from "react";

export default function SignOutIndex() {
  const { state, actions, dispatch } =
    useContext<ISignOutContext>(SignOutContext);
  const { signOutUser } = actions;
  const { sucessful } = state.signOutUserState;

  useEffect(() => {
    signOutUser()(dispatch);
  }, [dispatch, signOutUser]);

  useEffect(() => {
    if (sucessful) {
      window.location.href = window.location.origin;
    }
  }, [sucessful]);

  return <div />;
}
