import React, {useState} from 'react';
import {
    Anchor,
    Avatar,
    Burger,
    Container,
    createStyles,
    Group,
    Header,
    Menu,
    Text,
    Title,
    useMantineTheme
} from '@mantine/core';
import {useBooleanToggle} from '@mantine/hooks';
import Link from "next/link"
import {useRouter} from "next/router";
import useUser from "@hooks/useUser";
import {Logout, Pencil, Settings, Users} from "tabler-icons-react";
import {NextLink} from "@mantine/next";
import {useQueryClient} from "react-query";

const HEADER_HEIGHT = 84;
const mainLinks = [
    {
        "link": "/",
        "label": "Главная"
    },
    {
        "link": "/courses",
        "label": "Курсы"
    },
]

const adminLinks = [
    {
        "link": '/admin/users',
        "label": "Пользователи",
        "icon": Users
    }
]

const useStyles = createStyles((theme) => ({
    inner: {
        height: HEADER_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    links: {
        paddingTop: theme.spacing.lg,
        height: HEADER_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    mainLinks: {
        marginRight: -theme.spacing.sm,
    },

    mainLink: {
        textTransform: 'uppercase',
        fontSize: 14,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        padding: `7px ${theme.spacing.sm}px`,
        fontWeight: 700,
        borderBottom: '2px solid transparent',
        transition: 'border-color 100ms ease, color 100ms ease',

        '&:hover': {
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            textDecoration: 'none',
        },
    },

    secondaryLink: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        fontSize: theme.fontSizes.sm,
        textTransform: 'uppercase',
        transition: 'color 100ms ease',

        '&:hover': {
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            textDecoration: 'none',
        },
    },

    mainLinkActive: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottomColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6],
    },

    userMenu: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    userQuery: {
        color: theme.black,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
        },
    },

    userActive: {
        backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
    },
}));

export function DoubleHeader() {
    const [opened, toggleOpened] = useBooleanToggle(false);
    const {classes, cx} = useStyles();
    const router = useRouter()
    const userQuery = useUser()
    const theme = useMantineTheme()
    const queryClient = useQueryClient()
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.setItem("accessToken", null)
        queryClient.removeQueries("user")
    }

    const mainItems = mainLinks.map((item, index) => (
        <Link href={item.link} key={item.label}>
            <Anchor<'a'>
                href={item.link}
                className={cx(classes.mainLink, {
                    [classes.mainLinkActive]: item.link === "/" ?
                        router.route === item.link :
                        router.route.startsWith(item.link)
                })}
            >
                {item.label}
            </Anchor>
        </Link>
    ));

    const adminItems = adminLinks.map((item, index) => (
        <Menu.Item component={NextLink} href={item.link} key={index}
                   icon={<item.icon size={14}/>}>{item.label}</Menu.Item>
    ))

    return (
        <Header height={HEADER_HEIGHT}>
            <Container className={classes.inner}>
                {/*<MantineLogo width={130} />*/}
                <Title order={2}>Fantastic Waffle</Title>
                <div className={classes.links}>
                    <Group position="right">
                        {!userQuery.isSuccess && <>
                            <Link href={"/auth/login"}>
                                <Anchor<'a'>
                                    href={"/auth/login"}
                                    className={classes.secondaryLink}
                                >
                                    Вход
                                </Anchor>
                            </Link>
                            <Link href={"/auth/login"}>
                                <Anchor<'a'>
                                    href={"/auth/login"}
                                    className={classes.secondaryLink}
                                >
                                    Регистрация
                                </Anchor>
                            </Link>
                        </>}
                        {userQuery.isSuccess && <>
                            <Menu
                                size={260}
                                placement="end"
                                transition="pop-top-right"
                                className={classes.userMenu}
                                onClose={() => setUserMenuOpened(false)}
                                onOpen={() => setUserMenuOpened(true)}
                                control={
                                    <Group spacing={7}>
                                        <Avatar src={userQuery.data.avatarURL} alt={userQuery.data.username} radius="xl"
                                                size={26}/>
                                        <Text weight={500} sx={{lineHeight: 1, color: theme.black}} mr={3}>
                                            {userQuery.data.username}
                                        </Text>
                                        {/*<ChevronDown size={12}/>*/}
                                    </Group>
                                }
                            >
                                {userQuery.data.role === "ADMIN" && <>
                                    <Menu.Label>Админситратор</Menu.Label>
                                    {adminItems}
                                </>}
                                <Menu.Label>Настройки</Menu.Label>
                                <Menu.Item component={NextLink} href="/account" icon={<Settings size={14}/>}>Настройки
                                    аккаунта</Menu.Item>
                                <Menu.Item onClick={handleLogout} icon={<Logout size={14}/>}>Выйти</Menu.Item>
                            </Menu>
                        </>}
                    </Group>
                    <Group spacing={0} position="right" className={classes.mainLinks}>
                        {mainItems}
                    </Group>
                </div>
                <Burger
                    opened={opened}
                    onClick={() => toggleOpened()}
                    className={classes.burger}
                    size="sm"
                />
            </Container>
        </Header>
    );
}