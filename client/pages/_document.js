import { Html, Head, Main, NextScript } from 'next/document'
 
function Document() {
  return (
    <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600&family=Open+Sans:wght@300;400;500;600;700&family=Varela+Round&display=swap"/>
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}
export default Document