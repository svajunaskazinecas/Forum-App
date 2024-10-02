import "@/styles/globals.css";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  weight: "400",
  subsets: ["latin"],
  margin: "0",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <main className={raleway.className}>
        <Component {...pageProps} />;
      </main>
    </>
  );
}
