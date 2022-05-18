import { AppProps } from "next/app";

import { theme } from "../styles/theme";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ContextProvider } from "../contexts/ContextProvider";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </QueryClientProvider>
    </ContextProvider>
  );
}

export default MyApp;
