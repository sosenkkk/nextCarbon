import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "../../components/Layout/layout";
import { wrapper } from "@/store/store";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../helper/helper";
import { info } from "@/store/userInfoSlice";
import { login } from "@/store/authSlice";

function App({ Component, pageProps }) {

  const dispatch = useDispatch()
    const fetchUserData = async (token) => {
      const response = await fetch(
        BASE_URL+'my-account',{
          headers:{
            Authorization: "Bearer "+ token
          }
        }
      );
      const data = await response.json();
      const email = data.email;
      const firstName = data.firstName;
      const lastName = data.lastName;
      const user = {email, firstName, lastName}
      dispatch(info(user))
    };
    

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      dispatch(login(true))
      fetchUserData(token)
    }
  }, [])

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
