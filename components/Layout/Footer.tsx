import React from 'react';
import {createStyles, Container, Group, ActionIcon, Image, Title} from '@mantine/core';
import { BrandTwitter, BrandYoutube, BrandInstagram } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    footer: {
        // marginTop: 120,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

export function FooterSocial() {
    const { classes } = useStyles();

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Group>
                    <Image alt={"Waffle Logo"} src={'/food-waffles.svg'} height={32}/>
                    <Title order={2}>Fantastic Waffle</Title>
                </Group>
                <Group spacing={0} className={classes.links} position="right" noWrap>
                    <ActionIcon size="lg">
                        <BrandTwitter size={18} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <BrandYoutube size={18} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <BrandInstagram size={18} />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    );
}