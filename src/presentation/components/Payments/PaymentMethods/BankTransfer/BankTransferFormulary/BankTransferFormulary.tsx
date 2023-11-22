import {
  IPaymentBankTransferContext,
  PaymentBankTransferContext,
} from "application/context/Payments/PaymentMethods/PaymentBankTransfer/PaymentBankTransferContext";
import { IFile } from "domain/core/entities/fileEntity";
import { ISale } from "domain/core/entities/saleEntity";
import ISaleFailure from "domain/core/failures/sale/saleFailure";
import { IGetShoppingCartByIdResponse } from "domain/core/response/shoppingCart/shoppingCartResponsesEntities";
import { useRouter } from "next/router";
import Field from "presentation/components/common/Formulary/Field/Field";
import { printLogError } from "presentation/logs/logs";
import { TransactionsRoutesEnum } from "presentation/routes/transactionsRoutes";
import { IFieldValue } from "presentation/validators/fieldValues";
import { IFieldValidator } from "presentation/validators/vallidator";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import Picture from "./Picture/Picture";
import { bankTransferValidators } from "./Validators/bankTransferValidator";
import {
  bankTransferFields,
  bankTransferInitialValues,
} from "./Validators/bankTransferValues";

interface IBankTransferFormularyProps {
  shoppingCart: IGetShoppingCartByIdResponse;
}

export default function BankTransferFormulary({
  shoppingCart,
}: IBankTransferFormularyProps) {
  const { state, actions, dispatch } = useContext<IPaymentBankTransferContext>(
    PaymentBankTransferContext
  );
  const { createPayment } = actions;
  const { data: transaction, loading, sucessful, error } = state.createPayment;

  const router = useRouter();

  const [fields, setFields] = useState<IFieldValue[]>(bankTransferFields);
  const [values, setValues] = useState(bankTransferInitialValues);
  const [hasError, setHasError] = useState<ISaleFailure | null>(null);
  const [picture, setPicture] = useState<IFile>({} as IFile);
  const [totalAmount, setTotalAmount] = useState(
    shoppingCart.data.paidSummary.totalPaid
  );

  const onFieldValidated = (
    fieldId: number,
    name: string,
    value: string
  ): IFieldValue => {
    const handleFieldValidator = bankTransferValidators[name];
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
      const DOLLAR_CHANGE_AMOUNT = 8.05;
      const totalAmountPaid: string = (
        DOLLAR_CHANGE_AMOUNT * totalAmount
      ).toFixed(2);

      const createSale: ISale = {
        saleId: "",
        userId: "",
        paymentMethod: "bank-transfer",
        courses: shoppingCart.data.shoppingCart.courses,
        amount: shoppingCart.data.paidSummary.totalPaid,
        amountBs: parseFloat(totalAmountPaid),
        documentNumber: values.documentNumber,
        documentType: values.documentType,
        reference: values.reference,
        mainPicture: picture,
        status: "pending",
        type: "shopping-cart",
        createdAt: new Date(),
      };

      createPayment({ sale: createSale })(dispatch);
    }
  };

  const handleCreatePaymentSucessfull = useCallback(() => {
    window.scrollTo(0, 0);

    setTimeout(() => {
      router.push({
        pathname: TransactionsRoutesEnum.TransactionsView,
        query: { transactionId: transaction.transactionId },
      });
    }, 3000);
  }, [router, transaction.transactionId]);

  const handleCreatePaymentError = useCallback(() => {
    printLogError(error);
    setHasError(error);

    window.scrollTo(0, 0);
  }, [error]);

  useEffect(() => {
    if (sucessful) handleCreatePaymentSucessfull();
  }, [sucessful, handleCreatePaymentSucessfull]);

  useEffect(() => {
    if (error) handleCreatePaymentError();
  }, [error, handleCreatePaymentError]);

  return (
    <Form onSubmit={(e: any) => onSubmit(e)}>
      {sucessful && (
        <Alert variant="success" className="mb-5">
          Se ha enviado tu comprobante de pago. El proceso de comprobación y
          aprobación de tu pago puede tener un estimado de tiempo. Una vez
          aprobado tu pago, tendrás disponibilidad a ver tus cursos.
        </Alert>
      )}

      {hasError && (
        <Alert variant="danger" className="mb-5">
          Lo sentimos, algo no ha salido como se esperaba. Comprueba tu conexión
          y vuelve a intentarlo.
        </Alert>
      )}

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
        <Col lg={4} className="mb-4">
          <Picture file={picture} setFile={setPicture} />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={12}>
          <Button
            type="submit"
            variant="primary"
            className="btn-scale py-2"
            style={{ width: "300px" }}
            disabled={loading}
          >
            {loading ? (
              <Spinner
                animation="border"
                variant="light"
                className="spinner-border-light"
              />
            ) : (
              "Enviar comprobante"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
