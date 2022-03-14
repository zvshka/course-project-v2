import '../styles/globals.css'
import "../styles/prism.css"
import {SessionProvider} from "@components/SessionProvider";

function MyApp({Component, pageProps}) {
    return <SessionProvider>
        <Component {...pageProps} />
    </SessionProvider>
}

export default MyApp
