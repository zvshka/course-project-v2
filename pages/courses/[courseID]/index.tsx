import {Shell} from "@components/Layout/Shell";
import {Accordion, Button, Group, SimpleGrid, Title, Text} from "@mantine/core";
import {Lesson} from "@components/Content/Lesson";
import useCourse from "@hooks/useCourse";
import {useRouter} from "next/router";

const AccordionLabel = ({label}) => {
    return <Group position={"apart"}>
        <Text>{label}</Text>
        <Button>Добавить урок</Button>
    </Group>
}

export default function CoursePage() {
    const router = useRouter()
    const courseData = useCourse(router.query.courseID)
    return <Shell>
        <Group position={"apart"}>
            <Title order={2}>
                Страница курса
            </Title>
            <Button>
                Создать этап
            </Button>
        </Group>
        {courseData.isSuccess && <Accordion iconPosition="right">
            {courseData.course.stages.map((stage, index) => (
                <Accordion.Item label={<AccordionLabel label={stage.title}/>} key={index}>
                    <SimpleGrid cols={4}>
                        {stage.lessons.map((lesson, index) => (
                            <Lesson lesson={lesson} key={index}/>
                        ))}
                    </SimpleGrid>
                </Accordion.Item>
            ))}
        </Accordion>}
    </Shell>
}