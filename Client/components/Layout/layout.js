import { useState } from "react";
import Script from "next/script";
import React from "react";
import MainNagivation from "../Navbar/navbar";

function Layout(props) {
  const [auth, setauth] = useState(false)
  const loginSuccessHandler=()=>{
    setauth(true)
  }
  return (
    <>
      <main>
        <MainNagivation isAuthenticated={auth} onLoginSuccess={loginSuccessHandler}/>
        {props.children }
      </main>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></Script>
    </>
  );
}

export default Layout;
