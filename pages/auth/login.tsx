import Link from "next/link";
import {useRouter} from "next/router";
import {useForm} from "@mantine/form";
import {
    Anchor,
    Box,
    Button,
    createStyles,
    Divider,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    UnstyledButton
} from "@mantine/core";
import {BrandGithub} from "tabler-icons-react";
import axios from "axios";
import {useEffect} from "react";
import {useNotifications} from "@mantine/notifications";
import {useModals} from "@mantine/modals";
import ForgotPasswordForm from "@components/Content/Forms/ForgotPasswordForm";

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
        padding: theme.spacing.xl * 1.5,
        // marginTop: theme.spacing.xl * 4,
        [theme.fn.largerThan("sm")]: {
            width: '50%'
        },
        [theme.fn.largerThan("lg")]: {
            width: '33.333%'
        },
    },
    formTitle: {
        fontSize: theme.fontSizes.xl * 1.4,
        fontWeight: 800,
        lineHeight: 1,
        color: theme.colors.gray[8]
    },
    noAccount: {
        fontSize: theme.fontSizes.sm,
        marginTop: theme.spacing.md,
        fontWeight: 500,
        color: theme.colors.gray[7],
        lineHeight: 1
    },
    registerUrl: {
        cursor: "pointer",
        color: theme.colors.gray[8],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
        "&:hover": {
            color: theme.colors.blue[5],
            textDecoration: "underline"
        }
    },
    gitButton: {
        padding: `${theme.spacing.lg}px ${theme.spacing.md}px`,
        width: '100%',
        display: "flex",
        marginTop: theme.spacing.lg,
        backgroundColor: "rgba(0, 0, 0, 0)",
        border: 'solid 1px',
        borderRadius: theme.radius.md,
        [theme.fn.largerThan('sm')]: {
            paddingTop: theme.spacing.sm,
            paddingBottom: theme.spacing.sm
        }
    },
    gitButtonText: {
        fontWeight: 500,
        color: theme.colors.gray[7]
    }
}))

export default function Login() {
    const router = useRouter()
    const modals = useModals()
    const {classes, theme} = useStyles()
    const notifications = useNotifications()

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неверно указан email'),
        },
    });


    useEffect(() => {
        if (router.query.error) {
            notifications.showNotification({
                title: "Произошла ошибка",
                message: router.query.error,
                color: "red"
            })
        }
    }, [router.query.error])

    const handleSubmit = (values: typeof form.values) => {
        form.clearErrors()
        axios.post("/api/auth/login", {
            email: values.email,
            password: values.password
        }).then(res => {
            const accessToken = res.data.accessToken
            if (!accessToken) return form.setErrors(() => ({
                email: "",
                password: "Не правильный email или пароль"
            }))
            // localStorage.setItem("accessToken", res.data.accessToken)
            router.push(router.query.callbackUrl ? router.query.callbackUrl as string : "/").catch(e => console.log(e))
        }).catch(() => {
            form.setErrors({
                email: true,
                password: "Не правильный email или пароль"
            })
        })
    }

    const openForgotPassword = () => {
        modals.openModal({
            title: "Восстановление пароля",
            children: <ForgotPasswordForm/>
        })
    }

    return <Box className={classes.wrapper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Group position={"center"}>

                {/* LOGO */}

                <Paper radius={theme.spacing.sm / 2} shadow={'md'} className={classes.form}>
                    <Text className={classes.formTitle}>Вход в аккаунт</Text>
                    <Text className={classes.noAccount}>
                        Нет аккаунта?
                        <Link href={"/auth/register"} passHref>
                            <Anchor className={classes.registerUrl}> Регистрация</Anchor>
                        </Link>
                    </Text>

                    <Link href={"/api/auth/github"} passHref>
                        <UnstyledButton component={"a"} className={classes.gitButton}>
                            <Group>
                                <BrandGithub size={24}/>
                                <Text className={classes.gitButtonText}>Войти с Github</Text>
                            </Group>
                        </UnstyledButton>
                    </Link>

                    <Divider my="xl" label="ИЛИ" labelPosition="center" size="md" styles={{
                        label: {
                            fontSize: theme.fontSizes.md,
                            fontWeight: 500,
                        }
                    }}/>

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
                    <Group position={"center"} mt={"md"}>
                        <Button onClick={openForgotPassword}>
                            Забыли пароль?
                        </Button>
                    </Group>
                </Paper>
            </Group>
        </form>
    </Box>

}

Login.withoutLayout = true