import React from 'react';
import {Badge, Card, createStyles, Group, Image, Text, useMantineTheme} from '@mantine/core';
import Link from "next/link";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    section: {
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    like: {
        color: theme.colors.red[6],
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
}));

export function Course({course}) {
    const {classes} = useStyles();
    const theme = useMantineTheme();

    const features = course.badges.map((badge) => (
        <Badge
            color={"blue"}
            key={badge.label}
        >
            {badge.label}
        </Badge>
    ));

    return <Link href={`/courses/${course.id}`} passHref>
        <Card component={'a'} withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={course.iconURL} alt={course.title} height={180}/>
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Text size="lg" weight={500}>
                    {course.title}
                </Text>
                <Text size="sm" mt="xs">
                    {course.description}
                </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} color="dimmed">
                    Категории
                </Text>
                <Group spacing={7} mt={5}>
                    {features}
                </Group>
            </Card.Section>

            {/*<Group mt="xs">*/}
            {/*    <Button radius="md" style={{ flex: 1 }}>*/}
            {/*        Show details*/}
            {/*    </Button>*/}
            {/*    <ActionIcon variant="default" radius="md" size={36}>*/}
            {/*        <Heart size={18} className={classes.like} />*/}
            {/*    </ActionIcon>*/}
            {/*</Group>*/}
        </Card>
    </Link>
}