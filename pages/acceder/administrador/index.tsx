import SignInProvider from "application/context/Admin/SignIn/SignInContext";
import Head from "next/head";
import SignInIndex from "presentation/components/Admin/SignIn/SignInIndex";
import AuthLayout from "presentation/layouts/AuthLayout/AuthLayout";

const AdminSignIn = () => {
  return (
    <SignInProvider>
      <Head>
        <title>
          Acceder a tu cuenta como administrador - {process.env.appName}
        </title>
      </Head>

      <AuthLayout>
        <SignInIndex />
      </AuthLayout>
    </SignInProvider>
  );
};

export default AdminSignIn;
