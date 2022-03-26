import React, {useEffect} from 'react';
import {Anchor, Burger, Container, createStyles, Group, Header, Title} from '@mantine/core';
import {useBooleanToggle, useListState} from '@mantine/hooks';
import Link from "next/link"
import {useRouter} from "next/router";
import useUser from "@hooks/useUser";

const HEADER_HEIGHT = 84;

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
        fontSize: 13,
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
        fontSize: theme.fontSizes.xs,
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
}));

interface LinkProps {
    label: string;
    link: string;
}

interface DoubleHeaderProps {
    mainLinks: LinkProps[];
}

export function DoubleHeader({mainLinks}: DoubleHeaderProps) {
    const [opened, toggleOpened] = useBooleanToggle(false);
    const [userLinks, userLinksHandlers] = useListState([
        {
            "link": "#",
            "label": "Privacy & Security"
        },
        {
            "link": "/auth/login",
            "label": "Вход"
        },
        {
            "link": "/auth/register",
            "label": "Регистрация"
        }
    ])
    const {classes, cx} = useStyles();
    const router = useRouter()
    const userData = useUser()

    useEffect(() => {
        userData.isSuccess && userLinksHandlers.setState([
            {
                "link": "#",
                "label": "Privacy & Security"
            },
            {
                "link": "/profile",
                "label": "Аккаунт"
            }
        ])
    }, [userData.isSuccess])

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

    const secondaryItems = userLinks.map((item: any) => (
        <Link href={item.link} key={item.label}>
            <Anchor<'a'>
                href={item.link}
                className={classes.secondaryLink}
            >
                {item.label}
            </Anchor>
        </Link>
    ));

    return (
        <Header height={HEADER_HEIGHT}>
            <Container className={classes.inner}>
                {/*<MantineLogo width={130} />*/}
                <Title order={2}>Fantastic Waffle</Title>
                <div className={classes.links}>
                    <Group position="right">{secondaryItems}</Group>
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