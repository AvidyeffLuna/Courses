import {
  CoursesLessonsCreateContext,
  ICoursesLessonsCreateContext,
} from "application/context/Teacher/Courses/CousesLessons/CoursesLessonsCreate/CoursesLessonsCreateContext";
import { ICourseLesson } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { useRouter } from "next/router";
import Loading from "presentation/components/common/core/Loading/Loading";
import Field from "presentation/components/common/Formulary/Field/Field";
import { printLogError } from "presentation/logs/logs";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { IFieldValue } from "presentation/validators/fieldValues";
import { IFieldValidator } from "presentation/validators/vallidator";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { courseLessonValidators } from "./Validators/courseLessonValidator";
import {
  courseLessonFields,
  courseLessonInitialValues,
  TCourseLessonValues,
} from "./Validators/courseLessonValues";

export default function CourseLessonFormulary() {
  const { state, actions, dispatch } = useContext<ICoursesLessonsCreateContext>(
    CoursesLessonsCreateContext
  );
  const { createCourseLesson } = actions;
  const { data: course } = state.course;
  const { loading, sucessful, error } = state.createCourseLesson;

  const router = useRouter();

  const [fields, setFields] = useState<IFieldValue[]>(courseLessonFields);
  const [values, setValues] = useState(courseLessonInitialValues);
  const [hasError, setHasError] = useState<ICourseFailure | null>(null);

  const onFieldValidated = (
    fieldId: number,
    name: string,
    value: string
  ): IFieldValue => {
    const handleFieldValidator = courseLessonValidators[name];
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
      const courseLessonCreate: ICourseLesson = {
        courseLessonId: "",
        courseId: course.courseId,
        title: values.title,
        index: 0,
        description: values.description,
        items: 0,
        createdAt: new Date(),
      };

      createCourseLesson({ courseLesson: courseLessonCreate })(dispatch);
    }
  };

  const handleCreateCourseLessonSucessfull = useCallback(() => {
    window.scrollTo(0, 0);

    setTimeout(() => {
      router.push({
        pathname: TeacherCoursesRoutesEnum.CoursesView,
        query: { slug: course.slug, section: "lessons" },
      });
    }, 3000);
  }, [course.slug, router]);

  const handleCreateCourseLessonError = useCallback(() => {
    printLogError(error);
    setHasError(error);

    window.scrollTo(0, 0);
  }, [error]);

  useEffect(() => {
    if (sucessful) handleCreateCourseLessonSucessfull();
  }, [sucessful, handleCreateCourseLessonSucessfull]);

  useEffect(() => {
    if (error) handleCreateCourseLessonError();
  }, [error, handleCreateCourseLessonError]);

  return (
    <Form onSubmit={(e: any) => onSubmit(e)}>
      {sucessful && (
        <Alert variant="success" className="mb-5">
          ¡La sección se ha creado de manera satisfactoria!
        </Alert>
      )}

      {hasError && (
        <Alert variant="danger" className="mb-5">
          Algo no ha salido como se esperaba. Comprueba tu conexión a Internet y
          vuelve a intentarlo.
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
              "Crear sección"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
