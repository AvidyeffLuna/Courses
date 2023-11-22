import { IFieldValue } from "presentation/validators/fieldValues";
import { ElementType } from "react";
import { Form } from "react-bootstrap";

interface IFieldTextAreaProps {
  field: IFieldValue;
  value: string;
  onChange: (e: any, fieldId: number) => void;
  onBlur: (e: any, fieldId: number) => void;
  showErrors?: boolean;
}

export default function FieldTextArea({
  field,
  value,
  onChange,
  onBlur,
  showErrors,
}: IFieldTextAreaProps) {
  return (
    <Form.Control
      as={field.type as ElementType<any>}
      name={field.name}
      rows={4}
      aria-invalid={field.errorMessage && showErrors ? "true" : "false"}
      onChange={(e: any) => onChange(e, field.fieldId)}
      onBlur={(e: any) => onBlur(e, field.fieldId)}
      value={value}
      placeholder={field.placeholder}
    />
  );
}
