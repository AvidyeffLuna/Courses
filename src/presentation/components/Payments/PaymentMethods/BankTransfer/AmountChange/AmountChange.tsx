import { getNumberFormat } from "presentation/utils/intl/numberUtils";
import { useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

interface IAmountChangeProps {
  amount: number;
}

const DOLLAR_CHANGE_AMOUNT = 8.05;

export default function AmountChange({ amount }: IAmountChangeProps) {
  const [totalAmount, setTotalAmount] = useState(0);

  const getAmountInBs = useCallback(() => {
    if (amount === 0) {
      setTotalAmount(0.0);
      return;
    }

    const totalAmountPaid: string = (DOLLAR_CHANGE_AMOUNT * amount).toFixed(2);

    setTotalAmount(parseFloat(totalAmountPaid));
  }, [amount, setTotalAmount]);

  useEffect(() => {
    getAmountInBs();
  }, [amount, getAmountInBs]);

  return (
    <Row className="mt-2">
      <Col lg={12}>
        <div className="d-flex align-items-center">
          <Card className="me-5 w-100" style={{ height: "125px" }}>
            <Card.Body>
              <div>
                <h4 className="me-2">Monto a transferir (USD)</h4>

                <h4 className="text-primary">
                  {getNumberFormat({ value: amount, style: "currency" })}
                </h4>
              </div>
            </Card.Body>
          </Card>

          <Card className="w-100" style={{ height: "125px" }}>
            <Card.Body>
              <div>
                <h4 className="me-2">Monto a transferir (Bs)</h4>

                <h4 className="text-primary">{totalAmount} Bs</h4>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Col>
    </Row>
  );
}
