import {
  IAuthWithGoogleContext,
  AuthWithGoogleContext,
} from "application/context/OAuth2/Auth/AuthWithGoogleContext";
import { useCallback, useContext, useEffect } from "react";

export default function AuthWithGoogleIndex() {
  const { actions, dispatch } = useContext<IAuthWithGoogleContext>(
    AuthWithGoogleContext
  );
  const { createUserWithGoogle } = actions;

  const onCreateUserWithGoogle = useCallback(() => {
    createUserWithGoogle()(dispatch);
  }, [createUserWithGoogle, dispatch]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) onCreateUserWithGoogle();

    return () => {
      isCleanup = false;
    };
  }, [onCreateUserWithGoogle]);

  return <div />;
}
