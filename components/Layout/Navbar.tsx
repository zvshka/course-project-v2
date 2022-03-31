import Link from "next/link";
import {useState} from "react";
import useUser from "@hooks/useUser";
import {Button} from "@mantine/core";

export const Navbar = () => {
    const [show, setShow] = useState(false)
    const userData = useUser()
    return <header className="bg-gray-200">
        <div className="max-w-5xl mx-auto px-2">
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
                        <Link passHref href={"/"}>
                            <Button
                                component={"a"}
                                color={"dark"}
                                variant={"subtle"}
                            >
                                Главная
                            </Button>
                        </Link>
                        <Link passHref href={"/courses/"}>
                            <Button
                                component={"a"}
                                color={"dark"}
                                variant={"subtle"}
                            >
                                Курсы
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="md:flex hidden items-center">
                    <div className="space-x-4">
                        {!userData.isSuccess ? <Link passHref href={"/auth/login"}>
                            <Button
                                component={"a"}>
                                Войти
                            </Button>
                        </Link> : userData.user.username}
                    </div>
                </div>
            </div>
        </div>
    </header>
}