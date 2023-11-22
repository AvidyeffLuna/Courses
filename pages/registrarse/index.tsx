import SignUpProvider from "application/context/SignUp/SignUpContext";
import Head from "next/head";
import SignUpIndex from "presentation/components/Account/SignUp/SignUpIndex";
import AuthLayout from "presentation/layouts/AuthLayout/AuthLayout";

const SignUp = () => {
  return (
    <SignUpProvider>
      <Head>
        <title>Crear cuenta - {process.env.appName}</title>
      </Head>

      <AuthLayout>
        <SignUpIndex />
      </AuthLayout>
    </SignUpProvider>
  );
};

export default SignUp;
