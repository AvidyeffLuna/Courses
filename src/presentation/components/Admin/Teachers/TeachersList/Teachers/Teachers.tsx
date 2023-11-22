import {
  ITeachersListContext,
  TeachersListContext,
} from "application/context/Admin/Teachers/TeachersList/TeachersListContext";
import { ITeacher } from "domain/core/entities/teacherEntity";
import { useRouter } from "next/router";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import Paginate from "presentation/components/common/core/Paginate/Paginate";
import { getFullDate } from "presentation/utils/dates/datesUtils";
import { useCallback, useContext, useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";

export default function Teachers() {
  const { state, actions, dispatch } =
    useContext<ITeachersListContext>(TeachersListContext);
  const { getTeachers } = actions;
  const { data, loading, sucessful, error, limit, total } = state.teachers;

  const router = useRouter();

  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  const getTeachersDispatch = useCallback(() => {
    getTeachers({
      searchQuery: router.query.search_query
        ? router.query.search_query.toString()
        : null,
      limit,
    })(dispatch);
  }, [dispatch, getTeachers, limit, router.query.search_query]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getTeachersDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getTeachersDispatch]);

  useEffect(() => {
    if (sucessful) setTeachers(data);
  }, [data, sucessful]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage retry={getTeachersDispatch} />;

  if (teachers.length === 0 && sucessful) {
    return (
      <ErrorMessage
        title="No se han encontrado usuarios"
        description="No hemos encontrado usuarios en este momento"
        retry={getTeachersDispatch}
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
                {teachers.map((teacher: ITeacher) => (
                  <tr key={teacher.teacherId}>
                    <td className="cell-overflow">{teacher.firstName}</td>

                    <td className="text-center cell-overflow">
                      {teacher.lastName}
                    </td>

                    <td className="text-center">{teacher.email}</td>

                    <td className="text-center">
                      {getFullDate(new Date(teacher.createdAt))}
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
