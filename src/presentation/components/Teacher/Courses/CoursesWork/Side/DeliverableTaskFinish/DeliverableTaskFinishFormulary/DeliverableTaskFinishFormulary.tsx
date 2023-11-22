import {
  AuthContext,
  IAuthContext,
} from "application/context/Auth/AuthContext";
import {
  CoursesWorkContext,
  ICoursesWorkContext,
} from "application/context/Teacher/Courses/CoursesWork/CoursesWorkContext";
import IDeliverableFailure from "domain/core/failures/deliverable/deliverableFailure";
import { useRouter } from "next/router";
import Field from "presentation/components/common/Formulary/Field/Field";
import { printLogError } from "presentation/logs/logs";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { IFieldValue } from "presentation/validators/fieldValues";
import { IFieldValidator } from "presentation/validators/vallidator";
import { useEffect, useState, useContext, useCallback } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { deliverableTaskFinishValidators } from "./Validators/deliverableTaskFinishValidator";
import {
  deliverableTaskFinishFields,
  deliverableTaskFinishInitialValues,
} from "./Validators/deliverableTaskFinishValues";

export default function DeliverableTaskFinishFormulary() {
  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const { data: teacher } = authState.teacher;

  const { state, actions, dispatch } =
    useContext<ICoursesWorkContext>(CoursesWorkContext);
  const { editTaskFinish } = actions;
  const { data: course } = state.courseState;
  const { loading, sucessful, error } = state.editTaskFinishState;

  const router = useRouter();

  const [fields, setFields] = useState<IFieldValue[]>(
    deliverableTaskFinishFields
  );
  const [values, setValues] = useState(deliverableTaskFinishInitialValues);
  const [hasSucessful, setHasSucessful] = useState<boolean>(false);
  const [hasError, setHasError] = useState<IDeliverableFailure | null>(null);

  const onFieldValidated = (
    fieldId: number,
    name: string,
    value: string
  ): IFieldValue => {
    const handleFieldValidator = deliverableTaskFinishValidators[name];
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
    setHasSucessful(false);
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
      editTaskFinish({
        teacherId: teacher?.teacherId,
        course: course,
        courseTaskId: router.query.courseTaskId,
        userId: router.query.userId,
        score: values.score ? parseInt(values.score.toString()) : 0,
        note: values.note ? values.note.toString() : "",
      })(dispatch);
    }
  };

  const handleEditFinishTaskSucessfull = useCallback(() => {
    setHasSucessful(true);

    window.scrollTo(0, 0);

    setTimeout(() => {
      router.push({
        pathname: TeacherCoursesRoutesEnum.CoursesView,
        query: { slug: course.course?.slug, section: "deliverables" },
      });
    }, 3000);
  }, [course.course?.slug, router]);

  const handleEditFinishTaskError = useCallback(() => {
    printLogError(error);
    setHasError(error);

    window.scrollTo(0, 0);
  }, [error]);

  useEffect(() => {
    if (sucessful) handleEditFinishTaskSucessfull();
  }, [sucessful, handleEditFinishTaskSucessfull]);

  useEffect(() => {
    if (error) handleEditFinishTaskError();
  }, [error, handleEditFinishTaskError]);

  return (
    <Form onSubmit={(e: any) => onSubmit(e)}>
      {hasSucessful && (
        <Alert variant="success" className="mb-5">
          ¡Se ha finalizado la tarea del estudiante con éxito!
        </Alert>
      )}

      {hasError && (
        <Alert variant="danger" className="mb-5">
          Lo sentimos, algo no ha salido como se esperaba. Comprueba tu conexión
          y vuelve a intentarlo.
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
              "Finalizar tarea"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
