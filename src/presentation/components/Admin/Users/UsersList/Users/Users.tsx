import {
  IUsersListContext,
  UsersListContext,
} from "application/context/Admin/Users/UsersList/UsersListContext";
import { IUser } from "domain/core/entities/userEntity";
import { useRouter } from "next/router";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import Paginate from "presentation/components/common/core/Paginate/Paginate";
import { getFullDate } from "presentation/utils/dates/datesUtils";
import { useCallback, useContext, useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";

export default function Users() {
  const { state, actions, dispatch } =
    useContext<IUsersListContext>(UsersListContext);
  const { getUsers } = actions;
  const { data, loading, sucessful, error, limit, total } = state.users;

  const router = useRouter();

  const [users, setUsers] = useState<IUser[]>([]);

  const getUsersDispatch = useCallback(() => {
    getUsers({
      searchQuery: router.query.search_query
        ? router.query.search_query.toString()
        : null,
      limit,
    })(dispatch);
  }, [dispatch, getUsers, limit, router.query.search_query]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getUsersDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getUsersDispatch]);

  useEffect(() => {
    if (sucessful) setUsers(data);
  }, [data, sucessful]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage retry={getUsersDispatch} />;

  if (users.length === 0 && sucessful) {
    return (
      <ErrorMessage
        title="No se han encontrado usuarios"
        description="No hemos encontrado usuarios en este momento"
        retry={getUsersDispatch}
      />
    );
  }

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={12}>
            <Table responsive className="table-center">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th className="text-center">Apellido</th>
                  <th className="text-center">Correo electrónico</th>
                  <th className="text-center">Fecha</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user: IUser) => (
                  <tr key={user.userId}>
                    <td className="cell-overflow">{user.firstName}</td>

                    <td className="text-center cell-overflow">
                      {user.lastName}
                    </td>

                    <td className="text-center">{user.email}</td>

                    <td className="text-center">
                      {getFullDate(new Date(user.createdAt))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          <Col lg={12} className="d-flex justify-content-end mt-5">
            <Paginate
              page={router.query?.page ? router.query.page.toString() : "1"}
              limit={limit}
              total={total}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
