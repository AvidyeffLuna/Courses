import {
  ISignUpContext,
  SignUpContext,
} from "application/context/SignUp/SignUpContext";
import IAuthFailure from "domain/core/failures/auth/authFailure";
import { signUpFailures } from "domain/mappers/failures/auth/authFailures";
import Link from "next/link";
import Field from "presentation/components/common/Formulary/Field/Field";
import { printLogError } from "presentation/logs/logs";
import { AccountRoutesEnum } from "presentation/routes/accountRoutes";
import { MainRoutesEnum } from "presentation/routes/mainRoutes";
import { IFieldValue } from "presentation/validators/fieldValues";
import { IFieldValidator } from "presentation/validators/vallidator";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import Providers from "./Providers/Providers";
import { signUpValidators } from "./Validators/signUpValidator";
import { signUpFields, signUpInitialValues } from "./Validators/signUpValues";

export default function SignUpFormulary() {
  const { state, actions, dispatch } =
    useContext<ISignUpContext>(SignUpContext);
  const { signUpUser } = actions;
  const { loading, sucessful, error } = state.signUpUserState;

  const [fields, setFields] = useState<IFieldValue[]>(signUpFields);
  const [values, setValues] = useState(signUpInitialValues);
  const [hasError, setHasError] = useState<IAuthFailure | null>(null);
  const [conceptTerms, setConceptTerms] = useState(false);

  const onFieldValidated = (
    fieldId: number,
    name: string,
    value: string
  ): IFieldValue => {
    const handleFieldValidator = signUpValidators[name];
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

    if (!conceptTerms) formIsValid = false;

    if (formIsValid) {
      signUpUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      })(dispatch);
    }
  };

  const handleSignUpSucessful = useCallback(() => {
    window.location.href = window.location.origin + MainRoutesEnum.Init;
  }, []);

  const getErrorMessage = (error: IAuthFailure | null): string => {
    switch (error?.code) {
      case signUpFailures["EMAIL_IS_REGISTERED"]:
        return "El correo electrónico está en uso. Comprueba tu correo e intentalo nuevamente.";

      default:
        return "Algo no ha salido como se esperaba. Intentalo de nuevo más tarde.";
    }
  };

  useEffect(() => {
    if (sucessful) handleSignUpSucessful();
  }, [handleSignUpSucessful, sucessful]);

  const handleSignUpError = useCallback(() => {
    printLogError(error);
    setHasError(error);
  }, [error]);

  useEffect(() => {
    if (error) handleSignUpError();
  }, [error, handleSignUpError]);

  return (
    <Form onSubmit={(e: any) => onSubmit(e)}>
      {hasError && (
        <Alert variant="danger" className="mb-4">
          {getErrorMessage(error)}
        </Alert>
      )}

      <Row className="mb-4">
        <Col lg={12}>
          <Providers />
        </Col>
      </Row>

      <hr />

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
        <Col lg={12}>
          <div className="d-flex">
            <div>
              <Form.Check
                type="switch"
                checked={conceptTerms}
                id="custom-switch"
                label=""
                onChange={(e: any) => setConceptTerms(e.target.checked)}
              />
            </div>

            <div className="d-flex">
              <p className="form-label font-size-md me-1">
                He leído y acepto los
              </p>

              <Button
                variant="link"
                className="py-0 px-0"
                style={{ boxShadow: "none" }}
              >
                <p className="text-primary font-size-md">
                  Términos de servicio y Política de privacidad
                </p>
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-4 mt-5">
        <Col lg={12} className="text-center">
          <Button
            type="submit"
            variant="primary"
            className="btn-scale w-75 py-2"
            disabled={loading}
          >
            {loading ? (
              <Spinner
                animation="border"
                variant="light"
                className="spinner-border-light"
              />
            ) : (
              "Crear cuenta"
            )}
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={12} className="text-center">
          <div className="d-flex justify-content-center">
            <p className="me-2">¿Ya tienes cuenta?</p>

            <Link href={AccountRoutesEnum.Signin}>
              <a>
                <p className="text-primary">Accede a tu cuenta</p>
              </a>
            </Link>
          </div>
        </Col>
      </Row>
    </Form>
  );
}
