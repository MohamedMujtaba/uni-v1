// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ChakraProvider>
      <Navbar />
      {/* <ScaleFade key={router.route} initialScale={0.9} in="true"> */}
      <Component {...pageProps} />
      {/* </ScaleFade> */}
    </ChakraProvider>
  );
}

export default MyApp;
