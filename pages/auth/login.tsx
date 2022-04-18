import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/router";
import {useForm} from "@mantine/form";
import {Button, createStyles, PasswordInput, TextInput} from "@mantine/core";
import {fetcher} from "@lib/utils";

const useStyles = createStyles((theme) => ({
    loginButton: {
        width: "100%",
        height: "100%",
        marginTop: "1.5rem",
        color: "white",
        fontSize: "0.875rem",
        lineHeight: "1rem",
        fontWeight: 600,
        backgroundColor: "rgb(67, 56, 202) !important",
        borderRadius: "0.25rem",
        paddingTop: "0.6rem",
        paddingBottom: "0.6rem",
        "&:hover": {
            backgroundColor: "rgb(79 70 229) !important"
        }
    }
}))

export default function Login() {
    const router = useRouter()
    const {classes, cx} = useStyles()

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неверно указан email'),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        form.clearErrors()
        fetcher("/api/auth/login", {
            method: "POST",
            data: {
                email: values.email,
                password: values.password
            }
        }).then(res => {
            const accessToken = res.data.accessToken
            if (!accessToken) return form.setErrors(() => ({
                email: "",
                password: "Не правильный email или пароль"
            }))
            localStorage.setItem("accessToken", res.data.accessToken)
            router.push("/")
        }).catch(e => {
            form.setErrors({
                email: true,
                password: "Не правильный email или пароль"
            })
        })
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return <div className="min-h-screen bg-gradient-to-tl from-secondary to-indigo-900 w-full py-16 px-4">
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="flex flex-col items-center justify-center">

                {/* LOGO */}

                <div className="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-16">
                    <p tabIndex={0} className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
                        Вход в аккаунт</p>
                    <p tabIndex={0} className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">
                        Нет аккаунта?
                        <Link href={"/auth/register"}>
                            <a className="hover:text-gray-500 focus:text-gray-500 focus:outline-none
                                 focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer"> Регистрация</a>
                        </Link>
                    </p>

                    <button aria-label="Continue with github" role="button"
                            className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 md:py-3.5 py-2 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.1543 0C4.6293 0 0.154298 4.475 0.154298 10C0.153164 12.0993 0.813112 14.1456 2.04051 15.8487C3.26792 17.5517 5.00044 18.8251 6.9923 19.488C7.4923 19.575 7.6793 19.275 7.6793 19.012C7.6793 18.775 7.6663 17.988 7.6663 17.15C5.1543 17.613 4.5043 16.538 4.3043 15.975C4.1913 15.687 3.7043 14.8 3.2793 14.562C2.9293 14.375 2.4293 13.912 3.2663 13.9C4.0543 13.887 4.6163 14.625 4.8043 14.925C5.7043 16.437 7.1423 16.012 7.7163 15.75C7.8043 15.1 8.0663 14.663 8.3543 14.413C6.1293 14.163 3.8043 13.3 3.8043 9.475C3.8043 8.387 4.1913 7.488 4.8293 6.787C4.7293 6.537 4.3793 5.512 4.9293 4.137C4.9293 4.137 5.7663 3.875 7.6793 5.163C8.49336 4.93706 9.33447 4.82334 10.1793 4.825C11.0293 4.825 11.8793 4.937 12.6793 5.162C14.5913 3.862 15.4293 4.138 15.4293 4.138C15.9793 5.513 15.6293 6.538 15.5293 6.788C16.1663 7.488 16.5543 8.375 16.5543 9.475C16.5543 13.313 14.2173 14.163 11.9923 14.413C12.3543 14.725 12.6673 15.325 12.6673 16.263C12.6673 17.6 12.6543 18.675 12.6543 19.013C12.6543 19.275 12.8423 19.587 13.3423 19.487C15.3273 18.8168 17.0522 17.541 18.2742 15.8392C19.4962 14.1373 20.1537 12.0951 20.1543 10C20.1543 4.475 15.6793 0 10.1543 0Z"
                                fill="#333333"/>
                        </svg>
                        <p className="text-base font-medium ml-4 text-gray-700">Войти с Github</p>
                    </button>

                    <div className="w-full flex items-center justify-between py-5">
                        <hr className="w-full bg-gray-400"/>
                        <p className="text-base font-medium leading-4 px-2.5 text-gray-400">ИЛИ</p>
                        <hr className="w-full bg-gray-400"/>
                    </div>
                    <TextInput
                        required
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        placeholder="Password"
                        label="Пароль"
                        required
                        mt={"1rem"}
                        {...form.getInputProps('password')}
                    />
                    <Button
                        type="submit"
                        className={classes.loginButton}
                    >
                        Войти
                    </Button>
                </div>
            </div>
        </form>
    </div>

}