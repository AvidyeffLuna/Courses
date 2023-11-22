import { IFieldValue } from "presentation/validators/fieldValues";
import { Form } from "react-bootstrap";

interface IFieldTextProps {
  field: IFieldValue;
  value: string;
  onChange: (e: any, fieldId: number) => void;
  onBlur: (e: any, fieldId: number) => void;
  showErrors?: boolean;
}

export default function FieldText({
  field,
  value,
  onChange,
  onBlur,
  showErrors = true,
}: IFieldTextProps) {
  return (
    <Form.Control
      type={field.type}
      name={field.name}
      aria-invalid={field.errorMessage && showErrors ? "true" : "false"}
      onChange={(e: any) => onChange(e, field.fieldId)}
      onBlur={(e: any) => onBlur(e, field.fieldId)}
      value={value}
      placeholder={field.placeholder}
    />
  );
}
