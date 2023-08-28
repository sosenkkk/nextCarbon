import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "../../components/Layout/layout";
import { wrapper } from "@/store/store";
function App({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(App);
