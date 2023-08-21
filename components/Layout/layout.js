import Script from "next/script";
import { Navbar } from "flowbite-react";
import MainNagivation from "../Navbar/navbar";

function Layout(props) {
  return (
    <>
      <main>
        <MainNagivation />
        {props.children}
      </main>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></Script>
    </>
  );
}

export default Layout;
