import SignInProvider from "application/context/Teacher/SignIn/SignInContext";
import Head from "next/head";
import SignInIndex from "presentation/components/Teacher/Account/SignIn/SignInIndex";
import AuthLayout from "presentation/layouts/AuthLayout/AuthLayout";

const TeacherSignIn = () => {
  return (
    <SignInProvider>
      <Head>
        <title>Acceder como instructor - {process.env.appName}</title>
      </Head>

      <AuthLayout>
        <SignInIndex />
      </AuthLayout>
    </SignInProvider>
  );
};

export default TeacherSignIn;
