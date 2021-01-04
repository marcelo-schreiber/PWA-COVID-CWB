import React from "react";
import Head from "next/head";

function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} | Cwb Covid Meter</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&family=Montserrat:wght@400;600&display=swap"
          rel="stylesheet"
        />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Veja como Curitiba lida com o corona vírus." />
        <meta
          name="keywords"
          content="covid, corona, virus, cwb, curitiba, dados, estatística"
        />
        <meta name="author" content="Marcelo Schreiber" />
        <link rel="manifest" href="/manifest.json" />
        <link href="/favicon" rel="icon" type="image/png" />
        <meta name="theme-color" content="#3638AD" />
      </Head>

      <main>{children}</main>
    </>
  );
}

export default Layout;
