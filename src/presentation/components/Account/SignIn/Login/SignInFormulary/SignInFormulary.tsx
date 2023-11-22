import Field from "presentation/components/common/Formulary/Field/Field";
import { AccountRoutesEnum } from "presentation/routes/accountRoutes";
import { IFieldValue } from "presentation/validators/fieldValues";
import { IFieldValidator } from "presentation/validators/vallidator";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { signInValidators } from "./Validators/signInValidator";
import { signInFields, signInInitialValues } from "./Validators/signInValues";
import Link from "next/link";
import {
  ISignInContext,
  SignInContext,
} from "application/context/SignIn/SignInContext";
import IAuthFailure from "domain/core/failures/auth/authFailure";
import { MainRoutesEnum } from "presentation/routes/mainRoutes";
import { printLogError } from "presentation/logs/logs";
import { signInFailures } from "domain/mappers/failures/auth/authFailures";
import { useRouter } from "next/router";

export default function SignInFormulary() {
  const { state, actions, dispatch } =
    useContext<ISignInContext>(SignInContext);
  const { signInUser } = actions;
  const { loading, sucessful, error } = state.signInUserState;
  const { loading: googleSignInLoading, error: googleSignInError } =
    state.signInUserWithGoogleState;

  const router = useRouter();

  const [fields, setFields] = useState<IFieldValue[]>(signInFields);
  const [values, setValues] = useState(signInInitialValues);
  const [hasError, setHasError] = useState<IAuthFailure | null>(null);

  const onFieldValidated = (
    fieldId: number,
    name: string,
    value: string
  ): IFieldValue => {
    const handleFieldValidator = signInValidators[name];
    const fieldValidator: IFieldValidator = handleFieldValidator(value);
    const field: IFieldValue = fields[fieldId];

    if (fieldValidator.error) {
      field.errorMessage = fieldValidator.error.message;
    } else {
      field.errorMessage = null;
    }

    return field;
  };

  const onChange = (e: any, fieldId: number) => {
    setHasError(null);

    const { value, name } = e.target;

    const fieldsValidated: IFieldValue[] = [...fields];
    const fieldValidated: IFieldValue = onFieldValidated(fieldId, name, value);
    fieldsValidated[fieldId] = fieldValidated;
    setFields(fieldsValidated);

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    setHasError(null);

    let formIsValid = true;
    const fieldsValidated: IFieldValue[] = [];

    fields.forEach((field: IFieldValue) => {
      const fieldValidated: IFieldValue = onFieldValidated(
        field.fieldId,
        field.name,
        values[field.name]
      );

      fieldsValidated.push(fieldValidated);

      if (fieldValidated.errorMessage) formIsValid = false;
    });

    setFields(fieldsValidated);

    if (formIsValid)
      signInUser({ email: values.email, password: values.password })(dispatch);
  };

  const handleSignInSucessful = useCallback(() => {
    if (router.query?.redirectUrl) {
      window.location.href = window.decodeURI(
        router.query.redirectUrl.toString()
      );
      return;
    }

    window.location.href = window.location.origin + MainRoutesEnum.Init;
  }, [router.query]);

  const handleSignInError = useCallback(() => {
    printLogError(error ?? googleSignInError);
    setHasError(error ?? googleSignInError);
  }, [error, googleSignInError]);

  const getErrorMessage = (error: IAuthFailure | null): string => {
    switch (error?.code) {
      case signInFailures["USER_NOT_FOUND"]:
        return "Las credenciales son invalidas. Comprueba tus credenciales y vuelve a intentarlo.";

      case signInFailures["WRONG_PASSWORD"]:
        return "Las credenciales son invalidas. Comprueba tus credenciales y vuelve a intentarlo.";

      default:
        return "Algo no ha salido como se esperaba. Vuelve a intentarlo.";
    }
  };

  useEffect(() => {
    if (sucessful) handleSignInSucessful();
  }, [handleSignInSucessful, sucessful]);

  useEffect(() => {
    if (error || googleSignInError) handleSignInError();
  }, [error, googleSignInError, handleSignInError]);

  return (
    <Form onSubmit={(e: any) => onSubmit(e)}>
      {hasError && (
        <Alert variant="danger" className="mb-4">
          {getErrorMessage(error ?? googleSignInError)}
        </Alert>
      )}

      <Row className="mb-2 mt-4">
        {fields.map((field: IFieldValue) => (
          <Col
            key={field.fieldId}
            lg={field.row.lg ?? 12}
            md={field.row.md ?? 12}
            sm={field.row.sm ?? 12}
            xs={field.row.xs ?? 12}
            className="mb-3"
          >
            <Field
              field={field}
              value={values[field.name]}
              onChange={onChange}
            />
          </Col>
        ))}
      </Row>

      <Row>
        <Col lg={12} className="text-center">
          <div className="d-flex justify-content-end">
            <Link href={AccountRoutesEnum.RecoveryPassword}>
              <a>
                <p className="text-primary">¿Olvidaste tu contraseña?</p>
              </a>
            </Link>
          </div>
        </Col>
      </Row>

      <Row className="mb-5 mt-5">
        <Col lg={12} className="text-center">
          <Button
            type="submit"
            variant="primary"
            className="btn-scale w-75 py-2"
            disabled={loading || googleSignInLoading}
          >
            {loading ? (
              <Spinner
                animation="border"
                variant="light"
                className="spinner-border-light"
              />
            ) : (
              "Acceder a mi cuenta"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
