import Document, { Html, Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  static getResourceUrl(){
     const { publicRuntimeConfig } = getConfig();
    const resourceUrl = `${publicRuntimeConfig.resourceUrl}`;
    return resourceUrl;
  }
 
  render() {
    return (
      <Html>
        <Head>
          <title>Heritage</title>
          <link rel="icon" href="favicon.png" /> 
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}