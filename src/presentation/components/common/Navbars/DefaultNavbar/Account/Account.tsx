import AccountAuth from "./AccountAuth/AccountAuth";
import AccountUnauth from "./AccountUnauth/AccountUnauth";

interface IAccountProps {
  isLogged: boolean;
}

export default function Account({ isLogged }: IAccountProps) {
  return isLogged ? <AccountAuth /> : <AccountUnauth />;
}
