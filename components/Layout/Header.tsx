import React from 'react';
import {
    Anchor,
    Avatar, Box,
    Burger, Collapse,
    Container,
    createStyles,
    Divider,
    Group,
    Header,
    Image,
    Menu,
    Paper,
    Text,
    Title,
    Transition,
    UnstyledButton,
    useMantineTheme
} from '@mantine/core';
import {useBooleanToggle} from '@mantine/hooks';
import Link from "next/link"
import {useRouter} from "next/router";
import useUser from "@hooks/useUser";
import {Logout, Pencil, Settings, Users} from "tabler-icons-react";
import {NextLink} from "@mantine/next";
import {useQueryClient} from "react-query";
import axios from "axios";


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
    {
        "link": "/about",
        "label": "О проекте"
    }
]

const adminLinks = [
    {
        "link": '/admin/users',
        "label": "Пользователи",
        "icon": Users
    },
    {
        "link": '/lessons/create',
        "label": "Создать урок",
        "icon": Pencil
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
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
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
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7],
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

    dropdown: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 100,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: 'hidden',

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        // display: 'block',
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        [theme.fn.smallerThan('sm')]: {
            borderRadius: 0,
            padding: theme.spacing.md / 2,
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][0],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
        },
    },
}));

const MobileLink = ({theme, children, color = null, link = "/"}) => {
    const {classes} = useStyles()
    return <Link href={link}>
        <UnstyledButton component={"a"} className={classes.link} sx={{width: "100%", color}}>
            <Group position={"center"} spacing={theme.spacing.sm / 4}>
                {children}
            </Group>
        </UnstyledButton>
    </Link>
}

export function DoubleHeader() {
    const [opened, toggleOpened] = useBooleanToggle(false);
    const [userMenuOpened, toggleUserMenu] = useBooleanToggle(false)
    const {classes, cx} = useStyles();
    const router = useRouter()
    const userQuery = useUser()
    const theme = useMantineTheme()
    const queryClient = useQueryClient()

    const handleLogout = (e) => {
        axios.post("/api/auth/logout").then(res => {
            localStorage.removeItem("accessToken")
            queryClient.invalidateQueries("user")
        })
    }

    const mainItems = mainLinks.map((item) => (
        <Link href={item.link} key={item.label} passHref>
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
                <Link href={"/"} passHref>
                    <Group sx={{cursor: "pointer"}}>
                        <Image alt={"Waffle Logo"} src={'/food-waffles.svg'} height={32}/>
                        <Title order={3}>Fantastic Waffle</Title>
                    </Group>
                </Link>
                <div className={classes.links}>
                    <Group position="right">
                        {!userQuery.isSuccess && <>
                            <Link href={"/auth/login"} passHref>
                                <Anchor<'a'> className={classes.secondaryLink}>
                                    Вход
                                </Anchor>
                            </Link>
                            <Link href={"/auth/register"} passHref>
                                <Anchor<'a'> className={classes.secondaryLink}>
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
                                control={
                                    <Group spacing={7} sx={{cursor: "pointer"}}>
                                        <Avatar src={userQuery.data.avatarURL} alt={userQuery.data.username} radius="xl"
                                                size={26}/>
                                        <Text weight={500} sx={{lineHeight: 1, color: theme.black}}>
                                            {userQuery.data.username}
                                        </Text>
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

                <Transition transition="slide-down" duration={200} mounted={opened}>
                    {(styles) => <>
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            {userQuery.isSuccess ? <>
                                <Group spacing={7} className={classes.link} position={"center"} onClick={() => toggleUserMenu()}>
                                    <Avatar src={userQuery.data.avatarURL} alt={userQuery.data.username} radius="xl"
                                            size={26}/>
                                    <Text weight={500} sx={{lineHeight: 1, color: theme.black}}>
                                        {userQuery.data.username}
                                    </Text>
                                </Group>
                                <Collapse in={userMenuOpened}>
                                    <Box>
                                        {userQuery.data.role === "ADMIN" && <>
                                            <MobileLink theme={theme} link={"/admin/users"}>
                                                <Users size={18}/>
                                                <Text>Пользователи</Text>
                                            </MobileLink>
                                            <MobileLink theme={theme} link={"/lessons/create"}>
                                                <Pencil size={18}/>
                                                <Text>Создать урок</Text>
                                            </MobileLink>
                                        </>}
                                        <MobileLink theme={theme} link={"/account"}>
                                            <Settings size={18}/>
                                            <Text>Настройки аккаунта</Text>
                                        </MobileLink>
                                        <MobileLink theme={theme} color={"red"}>
                                            <Logout size={14}/>
                                            <Text>Выйти</Text>
                                        </MobileLink>
                                    </Box>
                                </Collapse>
                            </> : <>
                                <MobileLink theme={theme} link={"/auth/login"}>
                                    <Text>Вход</Text>
                                </MobileLink>
                                <MobileLink theme={theme} link={"/auth/register"}>
                                    <Text>Регистрация</Text>
                                </MobileLink>
                            </>}
                            <Divider/>
                            <MobileLink theme={theme}>
                                <Text>Главная</Text>
                            </MobileLink>
                            <MobileLink theme={theme} link={"/courses"}>
                                <Text>Курсы</Text>
                            </MobileLink>
                            <MobileLink theme={theme} link={"/about"}>
                                <Text>О проекте</Text>
                            </MobileLink>
                        </Paper>
                    </>}
                </Transition>
            </Container>
        </Header>
    );
}