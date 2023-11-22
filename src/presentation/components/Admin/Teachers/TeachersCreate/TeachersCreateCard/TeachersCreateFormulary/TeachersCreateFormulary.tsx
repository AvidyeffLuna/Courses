import {
  ITeachersCreateContext,
  TeachersCreateContext,
} from "application/context/Admin/Teachers/TeachersCreate/TeachersCreateContext";
import { ITeacher } from "domain/core/entities/teacherEntity";
import ITeacherFailure from "domain/core/failures/teacher/teacherFailure";
import { createTeacherFailures } from "domain/mappers/failures/teacher/teacherFailures";
import { useRouter } from "next/router";
import Field from "presentation/components/common/Formulary/Field/Field";
import { printLogError } from "presentation/logs/logs";
import { AdminTeachersRoutesEnum } from "presentation/routes/AdminRoutes/teachersRoutes";
import { IFieldValue } from "presentation/validators/fieldValues";
import { IFieldValidator } from "presentation/validators/vallidator";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { teachersCreateValidators } from "./Validators/teachersCreateValidator";
import {
  teachersCreateFields,
  teachersCreateInitialValues,
} from "./Validators/teachersCreateValues";

export default function TeachersCreate() {
  const { state, actions, dispatch } = useContext<ITeachersCreateContext>(
    TeachersCreateContext
  );
  const { createTeacher } = actions;
  const { sucessful, loading, error } = state.teacher;

  const router = useRouter();

  const [fields, setFields] = useState<IFieldValue[]>(teachersCreateFields);
  const [values, setValues] = useState(teachersCreateInitialValues);
  const [hasError, setHasError] = useState<ITeacherFailure | null>(null);

  const onFieldValidated = (
    fieldId: number,
    name: string,
    value: string
  ): IFieldValue => {
    const handleFieldValidator = teachersCreateValidators[name];
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

    if (formIsValid) {
      const teacherCreate: ITeacher = {
        teacherId: "",
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        provider: "email",
        genrer: "",
        documentType: "",
        documentNumber: "",
        createdAt: new Date(),
      };

      createTeacher({ teacher: teacherCreate, password: values.password })(
        dispatch
      );
    }
  };

  const handleTeacherCreateSucessful = useCallback(() => {
    setTimeout(() => {
      router.push({
        pathname: AdminTeachersRoutesEnum.TeachersList,
      });
    }, 3000);
  }, [router]);

  const getErrorMessage = (error: ITeacherFailure | null): string => {
    switch (error?.code) {
      case createTeacherFailures["EMAIL_IS_REGISTERED"]:
        return "El correo electrónico está en uso. Comprueba el correo e intentalo nuevamente.";

      default:
        return "Algo no ha salido como se esperaba. Intentalo de nuevo más tarde.";
    }
  };

  useEffect(() => {
    if (sucessful) handleTeacherCreateSucessful();
  }, [handleTeacherCreateSucessful, sucessful]);

  const handleTeacherCreateError = useCallback(() => {
    printLogError(error);
    setHasError(error);
  }, [error]);

  useEffect(() => {
    if (error) handleTeacherCreateError();
  }, [error, handleTeacherCreateError]);

  return (
    <Form onSubmit={(e: any) => onSubmit(e)}>
      {sucessful && (
        <Alert variant="success" className="mb-4">
          ¡Se ha creado el usuario de manera satisfactoria!
        </Alert>
      )}

      {hasError && (
        <Alert variant="danger" className="mb-4">
          {getErrorMessage(error)}
        </Alert>
      )}

      <Row className="mb-2">
        {fields.map((field: IFieldValue) => (
          <Col
            key={field.fieldId}
            lg={field.row.lg ?? 12}
            md={field.row.md ?? 12}
            sm={field.row.sm ?? 12}
            xs={field.row.xs ?? 12}
            className="mb-4"
          >
            <Field
              field={field}
              value={values[field.name]}
              onChange={onChange}
            />
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col lg={12}>
          <Button
            type="submit"
            variant="primary"
            className="btn-scale py-2"
            style={{ width: "250px" }}
            disabled={loading}
          >
            {loading ? (
              <Spinner
                animation="border"
                variant="light"
                className="spinner-border-light"
              />
            ) : (
              "Crear usuario"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
