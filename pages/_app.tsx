import { AppContextProvider } from "@/context/store";
import type { AppProps } from "next/app";
import "@/styles/tailwind.css";
import "@/styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}
