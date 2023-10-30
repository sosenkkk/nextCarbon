import { useState, useEffect } from "react";
import Script from "next/script";
import { BASE_URL } from "../../helper/helper";
import React from "react";
import NewNavbar from "../Navbar/newNavbar";
import Footer from "../footer/footer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login, userToken } from "@/store/authSlice";
import {
  fetchUserCart,
  fetchUserData,
  info,
  cart,
  total,
} from "@/store/userInfoSlice";
import { fetchProductModels } from "@/store/productSlice";
function Layout(props) {
  const [auth, setauth] = useState(false);
  const loginSuccessHandler = () => {
    setauth(true);
  };
  const router = useRouter();
  const dispatch = useDispatch();
  let token;
  const logoutHandler = async () => {
    const result = await fetch(BASE_URL + "logout", {
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    const res = await result.json();
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    dispatch(login(false));
    dispatch(userToken({}));
    dispatch(info({}));
    dispatch(cart([]));
    dispatch(total({}));
    router.push("/");
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };
  useEffect(() => {
    dispatch(fetchProductModels())
    token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    dispatch(login(true));
    dispatch(userToken(token));
    dispatch(fetchUserData(token));
    dispatch(fetchUserCart(token));
    setAutoLogout(remainingMilliseconds);
  }, [dispatch]);

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
