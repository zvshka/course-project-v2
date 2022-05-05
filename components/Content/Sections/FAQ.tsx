import React from 'react';
import {Accordion, Anchor, Box, Button, Container, createStyles, ThemeIcon, Title} from '@mantine/core';
import {Plus} from 'tabler-icons-react';
import Link from "next/link";
import useUser from "@hooks/useUser";
import {useRouter} from "next/router";
import axios from "axios";
import {useNotifications} from "@mantine/notifications";

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('control');

    return {
        wrapper: {
            paddingTop: theme.spacing.xl * 2,
            minHeight: 820,
            // backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            //     theme.colors[theme.primaryColor][7]
            // } 100%)`,
            backgroundColor: theme.colors[theme.primaryColor][7],
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top left',
            position: 'relative',

        },

        title: {
            color: theme.white,
            fontSize: 52,
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            marginBottom: theme.spacing.xl * 1.5,
        },

        item: {
            marginTop: theme.spacing.xl,
            backgroundColor: theme.white,
            borderBottom: 0,
            borderRadius: theme.radius.md,
            boxShadow: theme.shadows.lg,
        },

        control: {
            fontSize: theme.fontSizes.lg,
            padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
            color: theme.black,

            '&:hover': {
                backgroundColor: 'transparent',
            },
        },

        content: {
            paddingLeft: theme.spacing.xl,
            lineHeight: 1.6,
            color: theme.black,
        },

        icon: {
            ref: icon,
            marginLeft: theme.spacing.md,
        },

        gradient: {
            backgroundImage: `radial-gradient(${theme.colors[theme.primaryColor][6]} 0%, ${
                theme.colors[theme.primaryColor][5]
            } 100%)`,
        },

        itemOpened: {
            [`&.${icon}`]: {
                transform: 'rotate(45deg)',
            },
        },

        button: {
            display: 'block',
            marginTop: theme.spacing.md,

            '@media (max-width: 755px)': {
                display: 'block',
                width: '100%',
            },
        },
    };
});
export function FaqWithBg() {
    const {classes, cx} = useStyles();
    const userQuery = useUser()
    const router = useRouter()
    const notifications = useNotifications()
    const handleReset = () => {
        if (userQuery.isSuccess && userQuery.data) {
            axios.post("/api/auth/forgot", {
                email: userQuery?.data?.email
            }).then(res => {
                notifications.showNotification({
                    color: "green",
                    title: "Успех",
                    message: res.data.message
                })
            }).catch(e => {
                notifications.showNotification({
                    color: "red",
                    title: "Ошибка",
                    message: "Во время отправки запроса произошла ошибка"
                })
            })
        } else {
            router.push("/auth/forgot")
        }
    }
    return (
        <Box className={classes.wrapper} pb={"xl"}>
            <Container size="sm">
                <Title align="center" className={classes.title}>
                    Часто задаваемые вопросы
                </Title>

                <Accordion
                    iconPosition="right"
                    initialItem={0}
                    classNames={{
                        item: classes.item,
                        itemOpened: classes.itemOpened,
                        control: classes.control,
                        icon: classes.icon,
                        contentInner: classes.content,
                    }}
                    icon={
                        <ThemeIcon radius="xl" className={classes.gradient} size={32}>
                            <Plus size={18}/>
                        </ThemeIcon>
                    }
                >
                    <Accordion.Item label="Как я могу сбросить свой пароль?">
                        Сменить пароль можно при входе, в вашем профиле или нажав на эту кнопку
                        <Button onClick={handleReset} className={cx(classes.gradient, classes.button)}>Сбросить пароль</Button>
                    </Accordion.Item>
                    <Accordion.Item label="Можно ли создать больше одного аккаунта?">
                        Пока вы не делаете ничего такого, что может навредить сайту - можно
                    </Accordion.Item>
                    {/*<Accordion.Item label="Do you store credit card information securely?">*/}
                    {/*    {placeholder}*/}
                    {/*</Accordion.Item>*/}
                    <Accordion.Item label="Как я могу поддержать проект?">
                        Вся информация на странице <Link href={"/about"} passHref><Anchor>О проекте</Anchor></Link>
                    </Accordion.Item>
                    <Accordion.Item label="С какими платежными системами вы работаете?">
                        Мы принимаем добровольно отправленные средства через сторонний сервис, с этим вопросом вас стоит
                        пойти к ним
                    </Accordion.Item>
                    <Accordion.Item label="Как я могу подписать на месячную рассылку?">
                        {/*{placeholder}*/}
                        {/*<Button className={cx(classes.gradient, classes.button)}>*/}
                        {/*    Subscribe to newsletter*/}
                        {/*</Button>*/}
                        А оно вам надо?)))
                    </Accordion.Item>
                </Accordion>
            </Container>
        </Box>
    );
}