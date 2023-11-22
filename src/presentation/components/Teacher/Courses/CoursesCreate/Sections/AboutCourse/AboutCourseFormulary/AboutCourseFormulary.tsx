import { useRouter } from "next/router";
import Loading from "presentation/components/common/core/Loading/Loading";
import Field from "presentation/components/common/Formulary/Field/Field";
import { IFieldValue } from "presentation/validators/fieldValues";
import { IFieldValidator } from "presentation/validators/vallidator";
import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import Tags from "./Tags/Tags";
import { aboutCourseValidators } from "./Validators/aboutCourseValidator";
import {
  aboutCourseFields,
  aboutCourseInitialValues,
  TAboutCourseValues,
} from "./Validators/aboutCourseValues";

export default function AboutCourseFormulary() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState<IFieldValue[]>(aboutCourseFields);
  const [values, setValues] = useState({} as TAboutCourseValues);
  const [hasError, setHasError] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const setInitialValues = useCallback(() => {
    let initialValues = aboutCourseInitialValues;

    const courseDataStorage = localStorage.getItem("teacher-course-info")
      ? JSON.parse(localStorage.getItem("teacher-course-info") ?? "")
      : "";
    const { aboutCourseFields, tags } = courseDataStorage;

    initialValues.courseName = aboutCourseFields?.courseName ?? "";
    initialValues.initCourseDay = aboutCourseFields?.initCourseDay ?? "";
    initialValues.initCourseMonth = aboutCourseFields?.initCourseMonth ?? "";
    initialValues.initCourseYear = aboutCourseFields?.initCourseYear ?? "";
    initialValues.description = aboutCourseFields?.description ?? "";
    initialValues.coursePrice = aboutCourseFields?.coursePrice ?? "";

    setTags(tags ?? []);

    setValues(initialValues);
    setLoading(false);
  }, []);

  const onFieldValidated = (
    fieldId: number,
    name: string,
    value: string
  ): IFieldValue => {
    const handleFieldValidator = aboutCourseValidators[name];
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
    setHasError("");

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

    if (tags.length === 0) formIsValid = false;

    if (formIsValid) {
      const json = JSON.stringify({ aboutCourseFields: values, tags: tags });
      localStorage.setItem("teacher-course-info", json);

      router.push(window.location.pathname + "?step=2");
    }
  };

  useEffect(() => {
    setInitialValues();
  }, [setInitialValues]);

  if (loading) return <Loading />;

  return (
    <Form onSubmit={(e: any) => onSubmit(e)}>
      {hasError.length > 0 && (
        <Alert variant="danger" className="mb-5">
          {hasError}
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

      <Row>
        <Col lg={12}>
          <Tags tags={tags} setTags={setTags} />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={12}>
          <Button
            type="submit"
            variant="primary"
            className="btn-scale py-2"
            style={{ width: "250px" }}
          >
            Continuar
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
