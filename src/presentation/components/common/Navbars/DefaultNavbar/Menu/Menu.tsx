import Link from "next/link";
import { useRouter } from "next/router";
import { CoursesRoutesEnum } from "presentation/routes/coursesRoutes";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export default function Menu() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();

    router.push({
      pathname: CoursesRoutesEnum.CoursesList,
      query: { search_query: query },
    });
  };

  return (
    <div className="navbar-items">
      <div className="me-3">
        <Link
          href={{
            pathname: CoursesRoutesEnum.CoursesList,
          }}
        >
          <a className="navbar-item">Explorar</a>
        </Link>
      </div>

      <div>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group>
            <InputGroup>
              <Form.Control
                placeholder="Buscar cursos"
                aria-label="Buscar cursos"
                aria-describedby="search-button-addon"
                onChange={(e: any) => setQuery(e.target.value)}
                style={{ width: "400px", borderRadius: "6px" }}
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
      </div>
    </div>
  );
}
