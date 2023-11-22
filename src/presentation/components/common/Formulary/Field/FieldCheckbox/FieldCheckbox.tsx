import { IFieldOption, IFieldValue } from "presentation/validators/fieldValues";
import { Form } from "react-bootstrap";

interface IFieldCheckboxProps {
  field: IFieldValue;
  value: string | boolean;
  onChange: (e: any, fieldId: number) => void;
}

export default function FieldCheckbox({
  field,
  value,
  onChange,
}: IFieldCheckboxProps) {
  return (
    <div>
      <Form.Check
        type="checkbox"
        value={value.toString()}
        name={field.name}
        id={`checkbox-${field.name}`}
        label={field.label}
        onChange={(e: any) => onChange(e, field.fieldId)}
        checked={typeof value === "boolean" && value}
      />
    </div>
  );
}
