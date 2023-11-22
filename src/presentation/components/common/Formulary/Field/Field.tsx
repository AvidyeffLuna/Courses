import { IFieldValue } from "presentation/validators/fieldValues";
import { Form } from "react-bootstrap";
import FieldCheckbox from "./FieldCheckbox/FieldCheckbox";
import FieldLabel from "./FieldLabel/FieldLabel";
import FieldLabelWithIcon from "./FieldLabel/FieldLabelWithIcon";
import FieldRadio from "./FieldRadio/FieldRadio";
import FieldSelect from "./FieldSelect/FieldSelect";
import FieldText from "./FieldText/FieldText";
import FieldTextArea from "./FieldTextArea/FieldTextArea";

interface IFieldProps {
  field: IFieldValue;
  value: string | boolean;
  onChange: (e: any, fieldId: number) => void;
  onBlur?: (e: any, fieldId: number) => void;
  showErrors?: boolean;
}

export default function Field({
  field,
  value,
  onChange,
  onBlur = () => {},
  showErrors = true,
}: IFieldProps) {
  const getFieldComponent = () => {
    switch (field.type) {
      case "text":
        return (
          <FieldText
            field={field}
            value={value.toString()}
            onChange={onChange}
            onBlur={onBlur}
            showErrors={showErrors}
          />
        );
      case "password":
        return (
          <FieldText
            field={field}
            value={value.toString()}
            onChange={onChange}
            onBlur={onBlur}
            showErrors={showErrors}
          />
        );
      case "select":
        return (
          <FieldSelect
            field={field}
            value={value.toString()}
            onChange={onChange}
          />
        );
      case "textarea":
        return (
          <FieldTextArea
            field={field}
            value={value.toString()}
            onChange={onChange}
            onBlur={onBlur}
            showErrors={showErrors}
          />
        );
      case "radio":
        return (
          <FieldRadio
            field={field}
            value={value.toString()}
            onChange={onChange}
          />
        );
      case "checkbox":
        return (
          <FieldCheckbox field={field} value={value} onChange={onChange} />
        );

      default:
        return (
          <FieldText
            field={field}
            value={value.toString()}
            onChange={onChange}
            onBlur={onBlur}
          />
        );
    }
  };

  return (
    <Form.Group>
      {field.icon ? (
        <FieldLabelWithIcon icon={field.icon} label={field.label} />
      ) : (
        field.type !== "checkbox" && <FieldLabel label={field.label} />
      )}

      {getFieldComponent()}

      {field.errorMessage && showErrors && (
        <div>
          <span className="form-text--error">{field.errorMessage}</span>
        </div>
      )}

      {field.text && (
        <div>
          <span className="form-text">{field.text}</span>
        </div>
      )}
    </Form.Group>
  );
}
