import { IFieldOption, IFieldValue } from "presentation/validators/fieldValues";
import { Form } from "react-bootstrap";

interface IFieldRadioProps {
  field: IFieldValue;
  value: string;
  onChange: (e: any, fieldId: number) => void;
}

export default function FieldRadio({
  field,
  value,
  onChange,
}: IFieldRadioProps) {
  return (
    <div>
      {field.options?.map((option: IFieldOption) => (
        <Form.Check
          key={option.value}
          inline
          type="radio"
          value={value}
          name={field.name}
          id={`radio-${option.value}`}
          label={option.text}
          onChange={(e: any) => onChange(e, field.fieldId)}
          checked={value === option.value}
        />
      ))}
    </div>
  );
}
