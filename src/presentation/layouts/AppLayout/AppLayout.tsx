import WhatsappButton from "presentation/components/common/core/Buttons/WhatsappButton/WhatsappButton";
import DefaultFooter from "presentation/components/common/Footers/DefaultFooter/DefaultFooter";
import DefaultNavbar from "presentation/components/common/Navbars/DefaultNavbar/DefaultNavbar";

interface IAppLayoutProps {
  children: JSX.Element | JSX.Element[];
  isLogged: boolean;
  showWhatsappButton?: boolean;
}

export default function AppLayout({
  children,
  isLogged,
  showWhatsappButton = false,
}: IAppLayoutProps) {
  return (
    <>
      <header>
        <DefaultNavbar isLogged={isLogged} />
      </header>

      <main className="main main-fixed pb-5 mb-5">{children}</main>

      <footer className="pt-5">
        <DefaultFooter />
      </footer>

      {showWhatsappButton && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "90px",
            zIndex: 999,
          }}
        >
          <WhatsappButton />
        </div>
      )}
    </>
  );
}
