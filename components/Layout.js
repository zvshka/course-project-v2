import {Navbar} from "./Navbar";
import {Footer} from "./Footer";

export const Layout = ({children}) => {
    return <>
        <Navbar/>
        <main className="max-w-7xl mx-auto mt-8 px-2">
            {children}
        </main>
        <Footer/>
    </>
}