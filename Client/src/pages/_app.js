import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "../../components/Layout/layout";
import { wrapper } from "@/store/store";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, userToken } from "@/store/authSlice";
import {
  fetchUserCart,
  fetchUserData,
  info,
  cart,
  total,
} from "@/store/userInfoSlice";
import { useRouter } from "next/router";
import { BASE_URL } from "../../helper/helper";
import { NextUIProvider } from "@nextui-org/react";

function App({ Component, pageProps }) {
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
    <ThemeProvider enableSystem={true} attribute="class">
        <ChakraProvider>
        <NextUIProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          </NextUIProvider>
        </ChakraProvider>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(App);
