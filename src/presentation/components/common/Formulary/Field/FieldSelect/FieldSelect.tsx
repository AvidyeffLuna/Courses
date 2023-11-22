import { IFieldOption, IFieldValue } from "presentation/validators/fieldValues";
import { Form } from "react-bootstrap";

interface IFieldSelectProps {
  field: IFieldValue;
  value: string;
  onChange: (e: any, fieldId: number) => void;
}

export default function FieldSelect({
  field,
  value,
  onChange,
}: IFieldSelectProps) {
  return (
    <Form.Select
      className="form-control"
      name={field.name}
      defaultValue={value}
      onChange={(e: any) => onChange(e, field.fieldId)}
    >
      {field.placeholder.length > 0 && <option>{field.placeholder}</option>}

      {field.options?.map((option: IFieldOption) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </Form.Select>
  );
}
