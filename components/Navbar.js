import {NavItem} from "./NavItem";
import Link from "next/link";

export const Navbar = () => {
    return <header className="bg-gray-200">
        <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-between">
                <div className="flex">
                    <div className="py-4 mr-4 text-xl font-bold">
                        <Link href={"/"}>
                            <a>
                                Fantastic Waffle
                            </a>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-1">
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
                <div>secondary</div>
            </div>
        </div>
    </header>
}