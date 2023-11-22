import {
  AuthContext,
  IAuthContext,
} from "application/context/Auth/AuthContext";
import {
  CoursesWorkContext,
  ICoursesWorkContext,
} from "application/context/Teacher/Courses/CoursesWork/CoursesWorkContext";
import { IDeliverable } from "domain/core/entities/deliverableEntity";
import { IFile } from "domain/core/entities/fileEntity";
import IDeliverableFailure from "domain/core/failures/deliverable/deliverableFailure";
import { useRouter } from "next/router";
import Field from "presentation/components/common/Formulary/Field/Field";
import { printLogError } from "presentation/logs/logs";
import { IFieldValue } from "presentation/validators/fieldValues";
import { IFieldValidator } from "presentation/validators/vallidator";
import { useEffect, useState, useContext, useCallback } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import Documents from "./Documents/Documents";
import PreviewPictures from "./PreviewPictures/PreviewPictures";
import { deliverableAddValidators } from "./Validators/deliverableAddValidator";
import {
  deliverableAddFields,
  deliverableAddInitialValues,
} from "./Validators/deliverableAddValues";

export default function DeliverableAddFormulary() {
  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const { data: teacher } = authState.teacher;

  const { state, actions, dispatch } =
    useContext<ICoursesWorkContext>(CoursesWorkContext);
  const { createDeliverable } = actions;
  const { data: course } = state.courseState;
  const { loading, sucessful, error } = state.createDeliverableState;

  const router = useRouter();

  const [fields, setFields] = useState<IFieldValue[]>(deliverableAddFields);
  const [values, setValues] = useState(deliverableAddInitialValues);
  const [files, setFiles] = useState<IFile[]>([]);
  const [hasSucessful, setHasSucessful] = useState<boolean>(false);
  const [hasError, setHasError] = useState<IDeliverableFailure | null>(null);

  const onFieldValidated = (
    fieldId: number,
    name: string,
    value: string
  ): IFieldValue => {
    const handleFieldValidator = deliverableAddValidators[name];
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
      const deliverableCreate: IDeliverable = {
        deliverableId: "",
        courseId: course.courseId,
        courseTaskId: router.query.courseTaskId
          ? router.query.courseTaskId.toString()
          : "",
        userId: router.query.userId ? router.query.userId.toString() : "",
        teacherId: teacher?.teacherId,
        files,
        title: values.title,
        description: values.description,
        createdAt: new Date(),
      };

      createDeliverable({ deliverable: deliverableCreate })(dispatch);
    }
  };

  const handleCreateDeliverableSucessfull = useCallback(() => {
    setHasSucessful(true);

    window.scrollTo(0, 0);
  }, []);

  const handleCreateDeliverableError = useCallback(() => {
    printLogError(error);
    setHasError(error);

    window.scrollTo(0, 0);
  }, [error]);

  useEffect(() => {
    if (sucessful) handleCreateDeliverableSucessfull();
  }, [sucessful, handleCreateDeliverableSucessfull]);

  useEffect(() => {
    if (error) handleCreateDeliverableError();
  }, [error, handleCreateDeliverableError]);

  return (
    <Form onSubmit={(e: any) => onSubmit(e)}>
      {hasSucessful && (
        <Alert variant="success" className="mb-5">
          ¡Se ha enviado la respuesta al estudiante con éxito!
        </Alert>
      )}

      {hasError && (
        <Alert variant="danger" className="mb-5">
          Lo sentimos, algo no ha salido como se esperaba. Comprueba tu conexión
          y vuelve a intentarlo.
        </Alert>
      )}

      <Row className="mb-5">
        <Col lg={12}>
          <PreviewPictures
            files={files}
            pictures={files.filter((fileDelete) => fileDelete.type === "image")}
            setPictures={setFiles}
          />
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={12}>
          <Documents
            files={files}
            documents={files.filter(
              (fileDelete) => fileDelete.type === "document"
            )}
            setDocuments={setFiles}
          />
        </Col>
      </Row>

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
              "Enviar respuesta"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
