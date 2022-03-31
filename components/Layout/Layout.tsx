import {Navbar} from "./Navbar";
import {Footer} from "./Footer";

export const Layout = ({children}) => {
    return <>
        <Navbar/>
        <main className="max-w-5xl mx-auto px-2">
            <div className="w-full pt-6">
                {children}
            </div>
        </main>
        <Footer/>
    </>
}