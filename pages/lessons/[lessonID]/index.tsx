import {Shell} from "@components/Layout/Shell";
import {Box, Button, Group, Paper, Text, Title, useMantineTheme} from "@mantine/core";
import parser from "html-react-parser";
import {useRouter} from "next/router";
import useLesson from "@hooks/useLesson";
import Link from "next/link";
import useUser from "@hooks/useUser";

export default function LessonPage() {
    const router = useRouter()
    const theme = useMantineTheme()
    const lessonQuery = useLesson(router.query.lessonID)
    const userQuery = useUser()

    return <>
        <Paper shadow={'lg'} px={'sm'} py={'sm'}>
            <Group position={"apart"}>
                <Box>
                    <Title order={3}>
                        {lessonQuery.isSuccess && lessonQuery.data.title}
                    </Title>
                    <Text>{lessonQuery.isSuccess && lessonQuery.data.description}</Text>
                </Box>
                <Box>
                    <Text>Курс: {lessonQuery.isSuccess && lessonQuery.data.stage.course.title}</Text>
                    <Text>Этап: {lessonQuery.isSuccess && lessonQuery.data.stage.title}</Text>
                </Box>
            </Group>
        </Paper>
        <Paper shadow={'lg'} px={'sm'} py={'sm'} mt={'md'}>
            <Group position={'apart'}>
                {lessonQuery.isSuccess && <Link passHref href={'/courses/' + lessonQuery.data.stage.courseId}>
                    <Button component={'a'}>
                        Назад к курсу
                    </Button>
                </Link>}
                {userQuery.isSuccess && userQuery.data.role === "ADMIN" && <Link href={'/lessons/' + router.query.lessonID + '/edit'}>
                    <Button component={'a'}>
                        Редактировать урок
                    </Button>
                </Link>}
            </Group>
        </Paper>
        <Box className='ck-content' mt={'md'}>
            <Paper shadow={"xl"} radius={theme.radius.md} px={theme.spacing.sm} py={theme.spacing.sm / 4}>
                {lessonQuery.isSuccess && parser(lessonQuery.data.text)}
            </Paper>
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
    </>
}