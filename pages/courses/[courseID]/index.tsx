import {Shell} from "@components/Layout/Shell";
import {Accordion, Button, createStyles, Group, SimpleGrid, Text, ThemeIcon, Title} from "@mantine/core";
import useCourse from "@hooks/useCourse";
import {useRouter} from "next/router";
import {Lesson} from "@components/Content/Lesson";
import {Palette} from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
    accordionItem: {
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
}))

const AccordionLabel = ({label}) => {
    return <Group position={"apart"}>
        <Text>{label}</Text>
        <Button>Добавить урок</Button>
    </Group>
}

export default function CoursePage() {
    const {classes} = useStyles()
    const router = useRouter()
    const courseData = useCourse(router.query.courseID)
    const stages = courseData.course?.stages.map((stage, index) => (
        <Accordion.Item
            // icon={<ThemeIcon color="violet" variant="light" size={'lg'}>
            //     <Palette size={24}/>
            // </ThemeIcon>}
            key={index}
            label={<AccordionLabel label={stage.title}/>}>
            <SimpleGrid cols={4}>
                {stage.lessons.map((lesson, index) => (
                    <Lesson lesson={lesson} key={index}/>
                ))}
            </SimpleGrid>
        </Accordion.Item>
    ))
    return <Shell>
        <Group position={"apart"}>
            <Title order={2}>
                Страница курса
            </Title>
            <Button>
                Создать этап
            </Button>
        </Group>
        <Accordion
            classNames={{
                item: classes.accordionItem,
                control: classes.control,
                contentInner: classes.content,
            }}
            iconPosition="left">
            {stages}
        </Accordion>
    </Shell>
}