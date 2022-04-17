import {Shell} from "@components/Layout/Shell";
import {Box, Button, Group, Paper, Text, Title} from "@mantine/core";
import parser from "html-react-parser";
import {useRouter} from "next/router";
import useLesson from "@hooks/useLesson";
import Link from "next/link";
import useUser from "@hooks/useUser";

export default function LessonPage() {
    const router = useRouter()
    const lessonQuery = useLesson(router.query.lessonID)
    const userQuery = useUser()

    return <Shell>
        <Paper shadow={'lg'} px={'sm'} py={'sm'}>
            <Title order={3}>
                {lessonQuery.isSuccess && lessonQuery.data.title}
            </Title>
            <Text>Курс: {lessonQuery.isSuccess && lessonQuery.data.stage.course.title}</Text>
            <Text>Этап: {lessonQuery.isSuccess && lessonQuery.data.stage.title}</Text>
        </Paper>
        <Paper shadow={'lg'} px={'sm'} py={'sm'} mt={'md'}>
            <Group position={'apart'}>
                {lessonQuery.isSuccess && <Link passHref href={'/courses/' + lessonQuery.data.stage.courseId}>
                    <Button component={'a'}>
                        Назад к курсу
                    </Button>
                </Link>}
                {userQuery.isSuccess && userQuery.data.role === "ADMIN" && <Button component={'a'}>
                    Редактировать урок
                </Button>}
            </Group>
        </Paper>
        <Box className='ck-content' mt={'md'}>
            {lessonQuery.isSuccess && parser(lessonQuery.data.text)}
        </Box>
        <Paper shadow={'lg'} px={'sm'} py={'sm'} mt={'md'}>
            <Group position={'apart'}>
                <Button>
                    Назад
                </Button>
                <Button>
                    Вперед
                </Button>
            </Group>
        </Paper>
    </Shell>
}