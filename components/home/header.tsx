import Link from "next/link";
import { Container } from "../wrapper";
import { Navbar, NavbarBtn } from "./navbar";

export function Header() {
  return (
    <header className="z-50 bg-white h-16 sticky top-0 shadow">
      <Container>
        <div className="h-full flex items-center justify-between">
          <Logo />
          <Navbar />
          <NavbarBtn />
        </div>
      </Container>
    </header>
  );
}

export function Logo() {
  return <Link href="/">Logo</Link>;
}
