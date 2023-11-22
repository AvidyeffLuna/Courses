import { Form } from "react-bootstrap";

interface IFieldLabelWithIconProps {
    label: string;
    icon: any;
}

export default function FieldLabelWithIcon({ label, icon }: IFieldLabelWithIconProps) {
  return (
    <Form.Label style={{height: label.length > 0 ? "25px" : "18px", width: "100%"}}>
        <div className="d-flex align-items-center">
            <div className="me-3">
                <i className={icon.name} style={{fontSize: icon.size, color: icon.color}} />
            </div>

            <div>
                {label}
            </div>
        </div>
    </Form.Label>
  )
}
