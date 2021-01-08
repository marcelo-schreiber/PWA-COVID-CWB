import React from "react";

import Document, { Html, Main, Head, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head />
        <Main />
        <NextScript />
      </Html>
    );
  }
}

export default MyDocument;
