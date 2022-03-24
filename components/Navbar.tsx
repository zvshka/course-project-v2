import {NavItem} from "./NavItem";
import Link from "next/link";
import {useState} from "react";
import useUser from "@hooks/useUser";

export const Navbar = () => {
    const [show, setShow] = useState(false)
    const userData = useUser()
    return <header className="bg-gray-200">
        <div className="max-w-7xl mx-auto px-2">
            <div className="flex justify-between">
                <div className="flex">
                    <div className="py-4 mr-4 text-xl font-bold">
                        <Link href={"/"}>
                            <a>
                                Fantastic Waffle
                            </a>
                        </Link>
                    </div>
                    <div className="md:flex hidden items-center space-x-1">
                        <NavItem>
                            <Link href={"/"}>
                                <a>
                                    Главная
                                </a>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href={"/courses/"}>
                                <a>
                                    Курсы
                                </a>
                            </Link>
                        </NavItem>
                    </div>
                </div>
                <div className="md:flex hidden items-center">
                    <div className="space-x-4">
                        {!userData.isSuccess ? <Link href={"/auth/login"}>
                            <button
                                className="px-4 py-2 bg-secondary border-0 outline-0 text-white font-bold text-sm rounded-lg">
                                Войти
                            </button>
                        </Link> : userData.user.username}
                    </div>
                </div>
                <div className="md:hidden flex items-center">
                    <button className="items-center flex" onClick={() => setShow(!show)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        {show && <div className="md:hidden flex flex-col items-center bg-gray-300">
            <div className="font-bold w-full flex justify-center items-center text-center">
                <Link href={"/"}>
                    <a className="w-full py-2">
                        Главная
                    </a>
                </Link>
            </div>
            <div className="font-bold w-full flex justify-center items-center text-center">
                <Link href={"/courses"}>
                    <a className="w-full py-2">
                        Курсы
                    </a>
                </Link>
            </div>
            <div className="bg-secondary w-full flex justify-center items-center text-center text-white font-bold">
                <Link href={"/"}>
                    <a className="w-full py-2">
                        Войти
                    </a>
                </Link>
            </div>
        </div>}
    </header>
}