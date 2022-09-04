// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "../components/Navbar";
import { persistor, store } from "../redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <Navbar />
          {/* <ScaleFade key={router.route} initialScale={0.9} in="true"> */}
          <Component {...pageProps} />
          {/* </ScaleFade> */}
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
