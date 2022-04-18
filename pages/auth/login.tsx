import Link from "next/link";
import {useRouter} from "next/router";
import {useForm} from "@mantine/form";
import {Box, Button, createStyles, Group, Paper, PasswordInput, TextInput} from "@mantine/core";
import {fetcher} from "@lib/fetcher";
import {BrandGithub} from "tabler-icons-react";

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
    },
    wrapper: {
        minHeight: '100vh',
        backgroundImage: `linear-gradient(to top left, ${theme.colors.blue[6]}, ${theme.colors.indigo[9]})`,
        width: '100%',
        padding: `${theme.spacing.xl * 4}px ${theme.spacing.sm}px`
    },
    form: {
        width: '100%',
        padding: theme.spacing.md,
        marginTop: theme.spacing.xl * 4,
        [theme.fn.largerThan("sm")]: {
            width: '50%'
        },
        [theme.fn.largerThan("lg")]: {
            width: '33.333%'
        },
    }
}))

export default function Login() {
    const router = useRouter()
    const {classes, theme} = useStyles()

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

    return <Box className={classes.wrapper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Group position={"center"}>

                {/* LOGO */}

                <Paper radius={theme.spacing.sm / 2} shadow={'md'} className={classes.form}>
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
                        <BrandGithub size={24}/>
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
                        my={"md"}
                        {...form.getInputProps('password')}
                    />
                    <Button type="submit" className={classes.loginButton}>
                        Войти
                    </Button>
                </Paper>
            </Group>
        </form>
    </Box>

}