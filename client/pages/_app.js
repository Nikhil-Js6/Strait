import Head from 'next/Head'
import Layout from '../components/Layout'
import '../styles/global.css'

function App ({ Component, pageProps }) {
    return (
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <link rel='icon' href='/icon.ico'/>
                <link rel='apple-touch-icon' href='/icons/icon-192x192.png'/>
                <link rel='manifest' href='/manifest.json'/>
            </Head>
            <Component {...pageProps} />
        </Layout>   
    )
}

export default App
