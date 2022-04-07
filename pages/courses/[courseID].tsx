import {Shell} from "@components/Layout/Shell";
import {Accordion, Button, createStyles, Group, SimpleGrid, Text, Title} from "@mantine/core";
import useCourse from "@hooks/useCourse";
import {useRouter} from "next/router";
import {Lesson} from "@components/Content/Lesson";
import {CourseCreationForm} from "@components/Content/Forms/CourseCreationForm";
import {useModals} from "@mantine/modals";
import StageCreationForm from "@components/Content/Forms/StageCreationForm";

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
        <Group spacing={'md'}>
            {/*<Button>Изменить этап</Button>*/}
            <Button>Добавить урок</Button>
            <Button color={"red"}>Удалить этап</Button>
        </Group>
    </Group>
}

export default function CoursePage() {
    const {classes} = useStyles()
    const router = useRouter()
    const modals = useModals()
    const courseQuery = useCourse(router.query.courseID)

    const openCreatingModal = () => {
        const id = modals.openModal({
            title: "Создание этапа",
            children: <>
                <StageCreationForm courseId={router.query.courseID}/>
            </>
        })
    }

    const stages = courseQuery.data?.stages.map((stage, index) => (
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
            <Button onClick={openCreatingModal}>
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