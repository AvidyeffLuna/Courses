import SignInProvider from "application/context/SignIn/SignInContext";
import Head from "next/head";
import SignInIndex from "presentation/components/Account/SignIn/SignInIndex";
import AuthLayout from "presentation/layouts/AuthLayout/AuthLayout";

const SignIn = () => {
  return (
    <SignInProvider>
      <Head>
        <title>Acceder a tu cuenta - {process.env.appName}</title>
      </Head>

      <AuthLayout>
        <SignInIndex />
      </AuthLayout>
    </SignInProvider>
  );
};

export default SignIn;
