import Link from "next/link";
import { AccountRoutesEnum } from "presentation/routes/accountRoutes";

export default function AccountUnauth() {
  return (
    <div className="d-flex align-items-center">
      <div className="text-center me-4">
        <Link
          href={{
            pathname: AccountRoutesEnum.Signin,
          }}
        >
          <a className="font-size-lg">Acceder a mi cuenta</a>
        </Link>
      </div>
    </div>
  );
}
