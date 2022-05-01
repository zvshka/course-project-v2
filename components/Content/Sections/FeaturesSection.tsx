import React from 'react';
import {
    ThemeIcon,
    Text,
    Title,
    Container,
    SimpleGrid,
    useMantineTheme,
    createStyles,
} from '@mantine/core';
import {Code, Cookie, CurrencyRubel, Icon as TablerIcon, Message, Prison, Speedboat, User} from 'tabler-icons-react';

interface FeatureProps {
    icon: TablerIcon;
    title: React.ReactNode;
    description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
    const theme = useMantineTheme();
    return (
        <div>
            <ThemeIcon variant="light" size={40} radius={40}>
                <Icon style={{ width: 20, height: 20 }} />
            </ThemeIcon>
            <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
            <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
                {description}
            </Text>
        </div>
    );
}

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        marginBottom: theme.spacing.md,
        textAlign: 'center',

        [theme.fn.smallerThan('sm')]: {
            fontSize: 28,
            textAlign: 'left',
        },
    },

    description: {
        textAlign: 'center',

        [theme.fn.smallerThan('sm')]: {
            textAlign: 'left',
        },
    },
}));

interface FeaturesGridProps {
    title: React.ReactNode;
    description: React.ReactNode;
    data?: FeatureProps[];
}

export function FeaturesGrid({ title, description, data }: FeaturesGridProps) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const features = data?.map((feature, index) => <Feature {...feature} key={index} />);

    return (
        <Container className={classes.wrapper}>
            <Title className={classes.title}>{title}</Title>

            <Container size={560} p={0}>
                <Text size="sm" className={classes.description}>
                    {description}
                </Text>
            </Container>

            <SimpleGrid
                mt={60}
                cols={3}
                spacing={theme.spacing.xl * 2}
                breakpoints={[
                    { maxWidth: 980, cols: 2, spacing: 'xl' },
                    { maxWidth: 755, cols: 1, spacing: 'xl' },
                ]}
            >
                <Feature icon={Cookie} title={"Максимальное удобство"} description={"Курсы разделены на этапы, а этапы на уроки"}/>
                <Feature icon={Speedboat} title={"Великолепная оптимизация"} description={"Все курсы загружаются практически моментально"}/>
                <Feature icon={CurrencyRubel} title={"Не нужно платить ни копейки"} description={"Все курсы сделаны на добровольной основе, с вас никгода и никто не попросит оплаты"}/>
                <Feature icon={Message} title={"Постоянная поддержака"} description={"Вы можете связаться с разработчиком практически в любое время"}/>
                <Feature icon={User} title={"Полная безопасность"} description={"Все ваши данные надежны защищены и мы не собираем ничего о вас ( честно :D )"}/>
                <Feature icon={Code} title={"Открытый исходный код"} description={"Вы можете помочь проекту в любое время, код всегда открыт"}/>
            </SimpleGrid>
        </Container>
    );
}