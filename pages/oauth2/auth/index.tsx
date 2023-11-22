import AuthWithGoogleProvider from "application/context/OAuth2/Auth/AuthWithGoogleContext";
import type { NextPage } from "next";
import AuthWithGoogleIndex from "presentation/components/OAuth2/Auth/AuthWithGoogleIndex";

const AuthWithGoogle: NextPage = () => {
  return (
    <AuthWithGoogleProvider>
      <AuthWithGoogleIndex />
    </AuthWithGoogleProvider>
  );
};

export default AuthWithGoogle;
