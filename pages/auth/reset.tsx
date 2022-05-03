import Link from "next/link";
import {useEffect, useState} from "react";
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
    Popover,
    Progress,
    Space,
    Text,
    TextInput,
    UnstyledButton
} from "@mantine/core";
import {CheckIcon, Cross1Icon} from "@modulz/radix-icons";
import axios from "axios";
import {BrandGithub} from "tabler-icons-react";
import Cookies from 'js-cookie'
import useGithub from "@hooks/useGithub";
import {useNotifications} from "@mantine/notifications";

function PasswordRequirement({meets, label}: { meets: boolean; label: string }) {
    return (
        <Text
            color={meets ? 'teal' : 'red'}
            sx={{display: 'flex', alignItems: 'center'}}
            mt={7}
            size="sm"
        >
            {meets ? <CheckIcon/> : <Cross1Icon/>} <Box ml={10}>{label}</Box>
        </Text>
    );
}

const requirements = [
    {re: /\d/, label: 'Содержит числа'},
    {re: /[a-z]/, label: 'Содержит символ нижнего регистра'},
    {re: /[A-Z]/, label: 'Содержит символ верхнего регистра'},
    {re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Содержит спец. символ'},
];

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const useStyles = createStyles((theme) => ({
    registerButton: {
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
        padding: `${theme.spacing.xl * 2}px ${theme.spacing.sm}px`
    },
    form: {
        width: '100%',
        padding: theme.spacing.xl * 1.5,
        marginTop: theme.spacing.xl * 2,
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
}))

const handleLink = () => {
    window.location.href = "/api/auth/github?callbackUrl=" + window.location.href
    return
}

export default function Register() {
    const router = useRouter()
    const notifications = useNotifications()
    const {classes, theme} = useStyles()
    const [popoverOpened, setPopoverOpened] = useState(false);

    const form = useForm({
        initialValues: {
            password: '',
            confirmPassword: ''
        },

        validate: {
            password: (value) => getStrength(value) < 50 ? "Слишком слабый пароль" : null,
            confirmPassword: (value, values) =>
                value !== values.password ? 'Пароли не совпадают' : null
        },
    });


    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(form.values.password)}/>
    ));

    const strength = getStrength(form.values.password);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    const handleSubmit = (values: typeof form.values) => {
        form.clearErrors()
        axios.post("/api/auth/reset", {
            code: router.query.code,
            password: values.password,
        }).then(res => {
            notifications.showNotification({
                title: "Успех",
                message: "Пароль успешно сменен, теперь вы можете войти"
            })
            router.push("/auth/login")
        }).catch(e => {
            form.setErrors({
                username: true,
                email: true,
                password: true,
                confirmPassword: "Не удалось сменить пароль, что то пошло не так"
            })
        })
    }

    return <Box className={classes.wrapper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Group position={"center"}>

                <Paper radius={theme.spacing.sm / 2} shadow={'md'} className={classes.form}>
                    <Text className={classes.formTitle}>Восстановление пароля</Text>

                    <Popover
                        opened={popoverOpened}
                        position="bottom"
                        placement="start"
                        withArrow
                        styles={{popover: {width: '100%'}}}
                        sx={{display: "block"}}
                        trapFocus={false}
                        transition="pop-top-left"
                        onFocusCapture={() => setPopoverOpened(true)}
                        onBlurCapture={() => setPopoverOpened(false)}
                        target={
                            <PasswordInput
                                placeholder="Password"
                                label="Пароль"
                                required
                                mt={"1rem"}
                                {...form.getInputProps('password')}
                            />
                        }
                    >
                        <Progress color={color} value={strength} size={5} style={{marginBottom: 10}}/>
                        <PasswordRequirement label="Содержит как минимум 6 символов"
                                             meets={form.values.password.length > 5}/>
                        {checks}
                    </Popover>
                    <PasswordInput
                        placeholder="Password Confirm"
                        label="Подтверждение пароля"
                        required
                        mt={"1rem"}
                        {...form.getInputProps('confirmPassword')}
                    />
                    <Button type="submit" className={classes.registerButton}>
                        Отправить
                    </Button>
                </Paper>
            </Group>
        </form>
    </Box>

}

Register.withoutLayout = true