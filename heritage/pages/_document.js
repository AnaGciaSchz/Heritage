import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <script type="module" src="suneditor/src/plugins.js"></script>
        <Head>
          <title>Heritage</title>
          <link rel="icon" href="/favicon.png" />
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap');
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument