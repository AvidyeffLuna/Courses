export default function Copyright() {
  return (
    <div className="w-100 py-3">
      <div className="text-center w-100 mt-3">
        <p className="text-white font-size-md">
          COPYRIGHT 2023 {process.env.appName}. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
