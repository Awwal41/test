import { Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import '@/styles/globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700', '800', '900'],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="manifest" href="/manifest.json" />
        <title>EGFM USA</title>
        <meta
          name="description"
          content="EGFM USA - Empowering and transforming lives through faith and ministry"
        />
      </Head>
      <main className={montserrat.className}>
        <Component {...pageProps} />
        <Toaster position="bottom-right" reverseOrder={false} />
      </main>
    </>
  );
}