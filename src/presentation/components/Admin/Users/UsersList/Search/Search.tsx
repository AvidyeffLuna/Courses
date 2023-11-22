import { useRouter } from "next/router";
import { AdminUsersRoutesEnum } from "presentation/routes/AdminRoutes/usersRoutes";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export default function Search() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();

    let searchParams = { search_query: query };
    let routerQuery = router.query;

    delete routerQuery.search_query;
    delete routerQuery.page;

    searchParams = Object.assign(searchParams, routerQuery);

    router.push({
      pathname: AdminUsersRoutesEnum.UsersList,
      query: searchParams,
    });
  };

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Form.Group>
        <InputGroup>
          <Form.Control
            placeholder="Buscar usuarios"
            aria-label="Buscar usuarios"
            aria-describedby="search-button-addon"
            onChange={(e: any) => setQuery(e.target.value)}
            style={{ width: "300px" }}
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
