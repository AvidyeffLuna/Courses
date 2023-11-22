import { Form } from "react-bootstrap";

interface IFieldLabelProps {
    label: string;
}

export default function FieldLabel({ label }: IFieldLabelProps) {
  return (
    <Form.Label style={{height: label.length > 0 ? "25px" : "18px", width: "100%"}}>{label}</Form.Label>
  )
}
