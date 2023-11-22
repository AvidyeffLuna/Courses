import Image from "next/image";

export default function ZelleTitle() {
  return (
    <div className="d-flex align-items-center">
      <div className="me-4">
        <div
          style={{
            position: "relative",
            width: "48px",
            height: "48px",
          }}
        >
          <Image
            src="/static/image/icons/zelle-icon.png"
            alt="zelle-icon"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div>
        <h4>Recarga de saldo por Zelle</h4>
      </div>
    </div>
  );
}
