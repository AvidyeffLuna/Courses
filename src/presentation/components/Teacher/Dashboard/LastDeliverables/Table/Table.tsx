import { Col, Row, Table } from "react-bootstrap";

export default function DeliverablesTable() {
  return (
    <Row>
      <Col lg={12}>
        <Table responsive className="table-center">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th className="text-center">Curso</th>
              <th className="text-center">Tarea</th>
              <th className="text-center">Fecha</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}
