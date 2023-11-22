import Offcanvas from "react-bootstrap/Offcanvas";
import Fields from "./Fields/Fields";

interface IOffCanvasFiltersProps {
  show: boolean;
  handleClose: () => void;
}

export default function OffcanvasFilters({
  show,
  handleClose,
}: IOffCanvasFiltersProps) {
  return (
    <Offcanvas
      show={show}
      placement="end"
      onHide={handleClose}
      style={{ width: "350px" }}
    >
      <Offcanvas.Header>
        <Offcanvas.Title>Filtrar por</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Fields handleClose={handleClose} />
      </Offcanvas.Body>
    </Offcanvas>
  );
}
