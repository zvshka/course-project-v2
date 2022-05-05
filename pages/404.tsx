import React from 'react';
import {Button, Container, createStyles, Group, Text, Title} from '@mantine/core';
import Link from "next/link";

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
        minHeight: "100vh",
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 1.5,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

        [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 500,
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
    },
}));

export default function NotFoundTitle() {
    const {classes} = useStyles();

    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>Вы нашли секретное место.</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                К сожалению, это всего лишь страница ошибки 404. Может быть вы не так написали адрес, или страница была
                удалена/перемещена на другой URL.
            </Text>
            <Group position="center">
                <Link href={"/"} passHref>
                    <Button component={"a"} variant="subtle" size="md">
                        Верните меня назад
                    </Button>
                </Link>
            </Group>
        </Container>
    );
}
NotFoundTitle.withoutLayout = true