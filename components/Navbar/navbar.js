import { Navbar } from "flowbite-react";
import Link from "next/link";
import ThemeButton from "./themeToggler";
export default function MainNagivation() {
  return (
    <div>
      <Navbar
        fluid={true}
        rounded={true}
        className="fixed top-0 z-50 w-full"
        style={{ minHeight: "4rem" }}
      >
        <Navbar.Brand href="https://flowbite.com/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Carbon
          </span>
        </Navbar.Brand>
        <div className="flex self-center items-center md:hidden gap-2">
          
          <Navbar.Toggle />
          <ThemeButton />

        </div>

        <Navbar.Collapse style={{ marginTop: "8px" }}>
          <Link href="/" style={{ fontSize: "1.2rem", paddingTop: "4px" }}>
            Home
          </Link>
          <Link href="/" style={{ fontSize: "1.2rem", paddingTop: "4px" }}>
            About
          </Link>
          <Link href="/" style={{ fontSize: "1.2rem", paddingTop: "4px" }}>
            Services
          </Link>
          <Link href="/" style={{ fontSize: "1.2rem", paddingTop: "4px" }}>
            Pricing
          </Link>
          <Link href="/" style={{ fontSize: "1.2rem", paddingTop: "4px" }}>
            Contact
          </Link>
          <div className="pt-2 relative " style={{ bottom: "8px" }}>
            <ThemeButton />
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
