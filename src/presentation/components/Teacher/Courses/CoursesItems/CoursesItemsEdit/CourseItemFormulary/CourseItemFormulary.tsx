import {
  CoursesItemsEditContext,
  ICoursesItemsEditContext,
} from "application/context/Teacher/Courses/CousesItems/CoursesItemsEdit/CoursesItemsEditContext";
import { ICourseItem } from "domain/core/entities/courseEntity";
import { IFile } from "domain/core/entities/fileEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { useRouter } from "next/router";
import Field from "presentation/components/common/Formulary/Field/Field";
import { printLogError } from "presentation/logs/logs";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { IFieldValue } from "presentation/validators/fieldValues";
import { IFieldValidator } from "presentation/validators/vallidator";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import Documents from "./Documents/Documents";
import { courseItemValidators } from "./Validators/courseItemValidator";
import {
  courseItemFields,
  courseItemInitialValues,
} from "./Validators/courseItemValues";
import Video from "./Video/Video";

export default function CourseItemFormulary() {
  const { state, actions, dispatch } = useContext<ICoursesItemsEditContext>(
    CoursesItemsEditContext
  );
  const { editCourseItem } = actions;
  const { data: courseItem } = state.courseItem;
  const { loading, sucessful, error } = state.editCourseItem;

  const router = useRouter();

  const [fields, setFields] = useState<IFieldValue[]>(courseItemFields);
  const [values, setValues] = useState(courseItemInitialValues);
  const [video, setVideo] = useState<IFile>({} as IFile);
  const [files, setFiles] = useState<IFile[]>([]);
  const [hasError, setHasError] = useState<ICourseFailure | null>(null);

  console.log(files);

  const setInitialValues = useCallback(() => {
    let initialValues = courseItemInitialValues;

    initialValues.title = courseItem.title;
    initialValues.description = courseItem.description;

    setVideo({
      url: courseItem.mainVideoUrl,
      type: "video",
    } as IFile);

    if (courseItem.mediaList.length > 0) {
      const filesMap: IFile[] = [];

      courseItem.mediaList.forEach((media) => {
        filesMap.push({
          url: media.url,
          type: media.type,
          name: media.name,
        } as IFile);
      });

      setFiles(filesMap);
    }

    setValues(initialValues);
  }, [
    courseItem.description,
    courseItem.mainVideoUrl,
    courseItem.mediaList,
    courseItem.title,
  ]);

  useEffect(() => {
    setInitialValues();
  }, [setInitialValues]);

  const onFieldValidated = (
    fieldId: number,
    name: string,
    value: string
  ): IFieldValue => {
    const handleFieldValidator = courseItemValidators[name];
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
      const courseItemEdit: ICourseItem = {
        courseItemId: courseItem.courseItemId,
        courseLessonId: router.query?.courseLessonId
          ? router.query.courseLessonId.toString()
          : "",
        courseId: courseItem.courseId,
        mainVideo: video,
        files: files,
        mainVideoUrl: "",
        title: values.title,
        index: courseItem.index,
        description: values.description,
        createdAt: courseItem.createdAt,
        mediaList: courseItem.mediaList,
      };

      editCourseItem({ courseItem: courseItemEdit })(dispatch);
    }
  };

  const handleEditCourseItemSucessfull = useCallback(() => {
    window.scrollTo(0, 0);

    setTimeout(() => {
      router.push({
        pathname: TeacherCoursesRoutesEnum.CoursesView,
        query: {
          slug: router.query.slug,
          section: "lessons",
          lessonId: router.query?.courseLessonId
            ? router.query.courseLessonId.toString()
            : "",
        },
      });
    }, 3000);
  }, [router]);

  const handleEditCourseItemError = useCallback(() => {
    printLogError(error);
    setHasError(error);

    window.scrollTo(0, 0);
  }, [error]);

  useEffect(() => {
    if (sucessful) handleEditCourseItemSucessfull();
  }, [sucessful, handleEditCourseItemSucessfull]);

  useEffect(() => {
    if (error) handleEditCourseItemError();
  }, [error, handleEditCourseItemError]);

  return (
    <Form onSubmit={(e: any) => onSubmit(e)}>
      {sucessful && (
        <Alert variant="success" className="mb-5">
          ¡La clase se ha modificado de manera satisfactoria!
        </Alert>
      )}

      {hasError && (
        <Alert variant="danger" className="mb-5">
          Algo no ha salido como se esperaba. Comprueba tu conexión a Internet y
          vuelve a intentarlo.
        </Alert>
      )}

      <Row className="mb-5">
        <Col lg={12}>
          <Video file={video} setFile={setVideo} />
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
              "Modificar clase"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
