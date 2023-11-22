import {
  ISalesListContext,
  SalesListContext,
} from "application/context/Admin/Sales/SalesList/SalesListContext";
import { ISale } from "domain/core/entities/saleEntity";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import Paginate from "presentation/components/common/core/Paginate/Paginate";
import { paymentMethodsEnum } from "presentation/enum/paymentMethod/paymentMethodEnum";
import {
  salesStatusEnum,
  statusColorsEnum,
} from "presentation/enum/status/statusEnum";
import { AdminSalesRoutesEnum } from "presentation/routes/AdminRoutes/salesRoutes";
import { getFullDate } from "presentation/utils/dates/datesUtils";
import { getNumberFormat } from "presentation/utils/intl/numberUtils";
import { useCallback, useContext, useEffect, useState } from "react";
import { Badge, Card, Col, Dropdown, Row, Table } from "react-bootstrap";

export default function Sales() {
  const { state, actions, dispatch } =
    useContext<ISalesListContext>(SalesListContext);
  const { getSales } = actions;
  const { data, loading, sucessful, error, limit, total } = state.sales;

  const router = useRouter();

  const [sales, setSales] = useState<ISale[]>([]);

  const getSalesDispatch = useCallback(() => {
    getSales({
      minAmount: router.query?.min_amount
        ? parseFloat(router.query.min_amount.toString())
        : null,
      maxAmount: router.query?.max_amount
        ? parseFloat(router.query.max_amount.toString())
        : null,
      status:
        router.query.status && router.query.status.length > 0
          ? router.query.status
          : null,
      searchQuery: router.query.search_query
        ? router.query.search_query.toString()
        : null,
      limit,
    })(dispatch);
  }, [
    dispatch,
    getSales,
    limit,
    router.query.max_amount,
    router.query.min_amount,
    router.query.search_query,
    router.query.status,
  ]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getSalesDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getSalesDispatch]);

  useEffect(() => {
    if (sucessful) setSales(data);
  }, [data, sucessful]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage retry={getSalesDispatch} />;

  if (sales.length === 0 && sucessful) {
    return (
      <ErrorMessage
        title="No se han encontrado pagos"
        description="No hemos encontrado pagos en este momento"
        retry={getSalesDispatch}
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
                  <th>Monto</th>
                  <th className="text-center">Método de pago</th>
                  <th className="text-center">Estado</th>
                  <th className="text-center">Fecha</th>
                  <th className="text-center">Opciones</th>
                </tr>
              </thead>

              <tbody>
                {sales.map((sale: ISale) => (
                  <tr key={sale.saleId}>
                    <td className="text-primary font-weight-bold cell-overflow">
                      {getNumberFormat({
                        value: sale.amount,
                        style: "currency",
                      })}
                    </td>

                    <td className="text-center cell-overflow">
                      {paymentMethodsEnum[sale.paymentMethod]}
                    </td>

                    <td className="text-center">
                      <Badge
                        bg={statusColorsEnum[sale.status]}
                        className="badge-xs"
                      >
                        {salesStatusEnum[sale.status]}
                      </Badge>
                    </td>

                    <td className="text-center">
                      {getFullDate(new Date(sale.createdAt))}
                    </td>

                    <td className="text-center">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant=""
                          id="dropdown-menu"
                          className="dropdown-toggle--not py-0 px-0"
                        >
                          <i
                            className="fa-solid fa-ellipsis icon-dark"
                            style={{ fontSize: "25px" }}
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Link
                            href={{
                              pathname: AdminSalesRoutesEnum.SalesView,
                              query: { saleId: sale.saleId },
                            }}
                          >
                            <a className="dropdown-item">
                              <div className="d-flex px-2 py-1">
                                <div className="me-3">
                                  <i
                                    className="fa-solid fa-eye icon-dark-50"
                                    style={{ fontSize: "16px" }}
                                  />
                                </div>

                                <div>Ver pago</div>
                              </div>
                            </a>
                          </Link>
                        </Dropdown.Menu>
                      </Dropdown>
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
