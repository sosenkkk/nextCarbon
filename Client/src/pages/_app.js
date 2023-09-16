import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "../../components/Layout/layout";
import { wrapper } from "@/store/store";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../helper/helper";
import { login } from "@/store/authSlice";
import { fetchUserData } from "@/store/userInfoSlice";
function App({ Component, pageProps }) {

  const dispatch = useDispatch()
   
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      dispatch(login(true))
      dispatch(fetchUserData(token))
    }
  }, [dispatch])

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
