import {Shell} from "@components/Layout/Shell";
import {Paper, Title, Text, Group, Button} from "@mantine/core";
import parser from "html-react-parser";
import {useRouter} from "next/router";
import useLesson from "@hooks/useLesson";
import Link from "next/link";

export default function LessonPage() {
    const router = useRouter()
    const lessonQuery = useLesson(router.query.lessonID)

    return <Shell>
        <Title order={2}>
            {lessonQuery.isSuccess && lessonQuery.data.title}
        </Title>
        <Text>Курс: {lessonQuery.isSuccess && lessonQuery.data.stage.course.title}</Text>
        <Text>Этап: {lessonQuery.isSuccess && lessonQuery.data.stage.title}</Text>
        <Group position={'apart'} my={'md'}>
            {lessonQuery.isSuccess && <Link passHref href={'/courses/' + lessonQuery.data.stage.courseId}>
                <Button component={'a'}>
                    Назад к курсу
                </Button>
            </Link>}
            <Button component={'a'}>
                Редактировать
            </Button>
        </Group>
        <div className='ck-content'>
            {lessonQuery.isSuccess && parser(lessonQuery.data.text)}
        </div>
        <Group position={'apart'} my={'md'}>
            <Button>
                Назад
            </Button>
            <Button>
                Вперед
            </Button>
        </Group>
    </Shell>
}