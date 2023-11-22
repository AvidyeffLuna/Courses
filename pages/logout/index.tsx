import SignOutProvider from "application/context/SignOut/SignOutContext";
import type { NextPage } from "next";
import SignOutIndex from "presentation/components/SignOut/SignOutIndex";

const SignOut: NextPage = () => {
  return (
    <SignOutProvider>
      <SignOutIndex />
    </SignOutProvider>
  );
};

export default SignOut;
