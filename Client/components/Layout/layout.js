import { useState } from "react";
import Script from "next/script";
import React from "react";
import NewNavbar from "../Navbar/newNavbar";
import Footer from "../footer/footer";

function Layout(props) {
  const [auth, setauth] = useState(false);
  const loginSuccessHandler = () => {
    setauth(true);
  };
  return (
    <>
      <main className="min-h-screen bg-gray-200 dark:bg-[#252525] text-gray-800 dark:text-gray-200">
        <NewNavbar
          isAuthenticated={auth}
          onLoginSuccess={loginSuccessHandler}
        />
        {props.children}
        <Footer/>
      </main>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></Script>
    </>
  );
}

export default Layout;
