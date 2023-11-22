import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import { useRouter } from "next/router";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { useContext, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export default function Search() {
  const { state } = useContext<ICoursesViewContext>(CoursesViewContext);
  const { data: course } = state.course;

  const router = useRouter();

  const [query, setQuery] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();

    let searchParams = {
      search_query: query,
      slug: course.slug,
      section: router.query.section,
    };
    let routerQuery = router.query;

    delete routerQuery.search_query;
    delete routerQuery.page;

    searchParams = Object.assign(searchParams, routerQuery);

    router.push({
      pathname: TeacherCoursesRoutesEnum.CoursesView,
      query: searchParams,
    });
  };

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Form.Group>
        <InputGroup>
          <Form.Control
            placeholder="Buscar tareas"
            aria-label="Buscar tareas"
            aria-describedby="search-button-addon"
            onChange={(e: any) => setQuery(e.target.value)}
          />
          <InputGroup.Text
            id="search-button-addon"
            className="py-0 px-0"
            style={{ backgroundColor: "rgba(0, 0, 0, .08)" }}
          >
            <Button
              type="submit"
              variant="primary"
              className="py-2 px-4"
              style={{
                borderTopRightRadius: "6px",
                borderBottomRightRadius: "6px",
              }}
            >
              <i className="fa-solid fa-magnifying-glass icon-white" />
            </Button>
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>
    </Form>
  );
}
