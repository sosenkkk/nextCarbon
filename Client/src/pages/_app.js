import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "../../components/Layout/layout";
import { wrapper } from "@/store/store";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, userToken } from "@/store/authSlice";
import { fetchUserData, info } from "@/store/userInfoSlice";
import { useRouter } from "next/router";

function App({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();
  let token;
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    dispatch(login(false));
    dispatch(userToken({}));
    dispatch(info({}));
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
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    dispatch(login(true));
    dispatch(fetchUserData(token));
    setAutoLogout(remainingMilliseconds);
  }, [dispatch]);

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(App);
