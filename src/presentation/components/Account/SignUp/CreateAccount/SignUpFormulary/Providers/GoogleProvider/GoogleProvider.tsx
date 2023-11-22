import {
  ISignUpContext,
  SignUpContext,
} from "application/context/SignUp/SignUpContext";
import Image from "next/image";
import { MainRoutesEnum } from "presentation/routes/mainRoutes";
import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function GoogleProvider() {
  const { state, actions, dispatch } =
    useContext<ISignUpContext>(SignUpContext);
  const { signUpUserWithGoogle } = actions;
  const { loading, sucessful } = state.signUpUserWithGoogleState;
  const { loading: signInUserLoading } = state.signUpUserState;

  useEffect(() => {
    if (sucessful) {
      window.location.href = window.location.origin + MainRoutesEnum.Init;
    }
  }, [sucessful]);

  return (
    <Button
      onClick={() => signUpUserWithGoogle()(dispatch)}
      disabled={loading || signInUserLoading}
      variant="google"
      className="w-100"
    >
      <div className="d-flex align-items-center justify-content-center">
        <div>
          <div
            style={{
              position: "relative",
              width: "25px",
              height: "25px",
            }}
          >
            <Image
              src="/static/media/providers/google-icon.svg"
              alt="google-signup-provider"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        <div className="ms-4">Crear cuenta con Google</div>
      </div>
    </Button>
  );
}
