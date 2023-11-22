interface IAuthLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export default function AuthLayout({ children }: IAuthLayoutProps) {
  return <main>{children}</main>;
}
