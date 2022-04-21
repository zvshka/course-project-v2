import React from 'react';
import {Button, createStyles, Group, Image, List, Text, ThemeIcon, Title,} from '@mantine/core';
import {Check} from 'tabler-icons-react';
import image from "../../public/food-waffles.svg"

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    content: {
        maxWidth: 480,
        marginRight: theme.spacing.xl * 3,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        flex: 1,

        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
                : theme.colors[theme.primaryColor][0],
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    },
}));

export function HeroSection() {
    const {classes} = useStyles();
    return (
        <div className={classes.inner}>
            <div className={classes.content}>
                <Title className={classes.title}>
                    <span className={classes.highlight}>Современный</span> проект <br/>
                </Title>
                <Text color="dimmed" mt="md">
                    Мой новый проект поможет вам не только легко обучиться программированию, но и найти что то полезное в качестве дополнение
                    к изученнуму материалу.
                </Text>

                <List
                    mt={30}
                    spacing="sm"
                    size="sm"
                    icon={
                        <ThemeIcon size={20} radius="xl">
                            <Check size={12}/>
                        </ThemeIcon>
                    }
                >
                    <List.Item>
                        <b>TypeScript based</b> – build type safe applications, all components and hooks
                        export types
                    </List.Item>
                    <List.Item>
                        <b>Free and open source</b> – all packages have MIT license, you can use Mantine in
                        any project
                    </List.Item>
                    <List.Item>
                        <b>No annoying focus ring</b> – focus ring will appear only when user navigates with
                        keyboard
                    </List.Item>
                </List>

                <Group mt={30}>
                    <Button radius="xl" size="md" className={classes.control}>
                        Начать
                    </Button>
                </Group>
            </div>
            <Image src={image.src} className={classes.image}/>
        </div>
    );
}