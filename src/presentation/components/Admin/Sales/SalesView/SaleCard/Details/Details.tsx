import {
  SalesViewContext,
  ISalesViewContext,
} from "application/context/Admin/Sales/SalesView/SalesViewContext";
import { IMedia } from "domain/core/entities/mediaEntity";
import ModalMediaList from "presentation/components/common/core/Modals/ModalMediaList";
import { paymentMethodsEnum } from "presentation/enum/paymentMethod/paymentMethodEnum";
import {
  salesStatusEnum,
  statusColorsEnum,
} from "presentation/enum/status/statusEnum";
import {
  get12HoursFormat,
  getFullDate,
} from "presentation/utils/dates/datesUtils";
import { getNumberFormat } from "presentation/utils/intl/numberUtils";
import { useContext, useState } from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";

export default function Details() {
  const { state } = useContext<ISalesViewContext>(SalesViewContext);
  const { data: sale } = state.sale;

  const [showMediaModal, setShowMediaModal] = useState(false);

  return (
    <Row>
      <Col lg={6} className="pe-5">
        <Row>
          <Col lg={12} className="mb-2">
            <div className="d-flex align-items-center">
              <div style={{ width: "200px" }}>
                <h5>Monto (USD):</h5>
              </div>

              <div className="d-flex align-items-center">
                <div className="me-3">
                  <p className="text-primary">
                    {getNumberFormat({ value: sale.amount, style: "currency" })}
                  </p>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={12} className="mb-2">
            <div className="d-flex align-items-center">
              <div style={{ width: "200px" }}>
                <h5>Monto (Bs):</h5>
              </div>

              <div className="d-flex align-items-center">
                <div className="me-3">
                  <p className="text-primary">{sale.amountBs} Bs</p>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={12} className="mb-2">
            <div className="d-flex align-items-center">
              <div style={{ width: "200px" }}>
                <h5>Método de pago:</h5>
              </div>

              <div>
                <p>{paymentMethodsEnum[sale.paymentMethod]}</p>
              </div>
            </div>
          </Col>

          <Col lg={12} className="mb-2">
            <div className="d-flex align-items-center">
              <div style={{ width: "200px" }}>
                <h5>Referencia:</h5>
              </div>

              <div>
                <p className="text-primary">{sale.reference}</p>
              </div>
            </div>
          </Col>

          <Col lg={12} className="mb-2">
            <div className="d-flex align-items-center">
              <div style={{ width: "200px" }}>
                <h5>Estado:</h5>
              </div>

              <div>
                <Badge bg={statusColorsEnum[sale.status]} className="badge-xs">
                  {salesStatusEnum[sale.status]}
                </Badge>
              </div>
            </div>
          </Col>
        </Row>
      </Col>

      <Col lg={6}>
        <Row>
          <Col lg={12} className="mb-2">
            <div className="d-flex align-items-center">
              <div style={{ width: "200px" }}>
                <h5>Documento de identidad:</h5>
              </div>

              <div className="me-3">
                <p>
                  {sale?.documentType ?? ""}-{sale?.documentNumber ?? ""}
                </p>
              </div>
            </div>
          </Col>

          {sale.paymentMethod === "mobile-payment" && (
            <Col lg={12} className="mb-2">
              <div className="d-flex align-items-center">
                <div style={{ width: "200px" }}>
                  <h5>Número de teléfono:</h5>
                </div>

                <div className="me-3">
                  <p>
                    {sale?.phoneOperatorCode ?? ""}-{sale?.phoneNumber ?? ""}
                  </p>
                </div>
              </div>
            </Col>
          )}

          <Col lg={12} className="mb-2">
            <div className="d-flex align-items-center">
              <div style={{ width: "200px" }}>
                <h5>Fecha:</h5>
              </div>

              <div>
                <p>{getFullDate(new Date(sale.createdAt))}</p>
              </div>
            </div>
          </Col>

          <Col lg={12} className="mb-2">
            <div className="d-flex align-items-center">
              <div style={{ width: "200px" }}>
                <h5>Hora:</h5>
              </div>

              <div>
                <p>{get12HoursFormat(new Date(sale.createdAt))}</p>
              </div>
            </div>
          </Col>

          {sale.mainPictureUrl && (
            <Col lg={12} className="mb-2">
              <div className="d-flex align-items-center">
                <div style={{ width: "200px" }}>
                  <h5>Comprobante de pago:</h5>
                </div>

                <div>
                  <Button
                    onClick={() => setShowMediaModal(true)}
                    variant="link"
                    className="py-0 px-0"
                  >
                    <p className="font-size-lg text-primary a-primary">
                      Ver comprobante de pago
                    </p>
                  </Button>
                </div>
              </div>
            </Col>
          )}
        </Row>

        {showMediaModal && (
          <ModalMediaList
            show={showMediaModal}
            onHide={() => setShowMediaModal(false)}
            mediaList={[
              {
                url: sale.mainPictureUrl,
                type: "image",
              } as IMedia,
            ]}
          />
        )}
      </Col>
    </Row>
  );
}
