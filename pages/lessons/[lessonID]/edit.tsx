import {useRouter} from "next/router";
import useLesson from "@hooks/useLesson";
import {useEffect} from "react";
import {Box, Button, Group, Paper, TextInput, Title, useMantineTheme} from "@mantine/core";
import parser from "html-react-parser";
import {useForm} from "@mantine/form";
import dynamic from "next/dynamic";
import Link from "next/link";
import axios from "axios";

const Editor = dynamic(() => import("@components/Content/Editor"), {
    ssr: false
})

export default function LessonEdit() {
    const router = useRouter()
    const theme = useMantineTheme()
    const {lessonID} = router.query
    const lessonQuery = useLesson(lessonID)

    const form = useForm({
        initialValues: {
            title: lessonQuery?.data?.title || '',
            description: lessonQuery?.data?.description || '',
            text: lessonQuery?.data?.text || '',
        }
    })

    useEffect(() => {
        if (lessonQuery.isSuccess && lessonQuery.data !== "") {
            form.setFieldValue('title', lessonQuery.data.title)
            form.setFieldValue('description', lessonQuery.data.description)
            form.setFieldValue('text', lessonQuery.data.text)
        }
        if (lessonQuery.isSuccess && lessonQuery.data === "") router.push("/")
    }, [lessonQuery.isSuccess, lessonQuery.data])

    const handleSubmit = (values: typeof form.values) => {
        axios.patch("/api/lessons/" + lessonID, values).then(r => {
        })
    }

    return <>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput label={"Название"} required
                       placeholder={'Название'}
                       {...form.getInputProps('title')}/>
            <TextInput label={"Краткое описание"} required
                       placeholder={'Описание'}
                       {...form.getInputProps('description')}/>
            <Title order={3} mb={'md'}>Редактор</Title>
            <Paper shadow={'xl'}>
                <Editor data={form.values.text} setData={form.getInputProps('text').onChange}/>
            </Paper>
            <Box my={'md'}>
                <Title order={3}>Предварительный результат</Title>
                <Paper px={theme.spacing.sm} py={theme.spacing.sm / 4} shadow={'xl'}
                       className='ck-content'>
                    {parser(form.values.text)}
                </Paper>
            </Box>
            <Group position={"apart"}>
                <Link href={"/lessons/" + lessonID} passHref>
                    <Button component={"a"}>
                        Вернуться к уроку
                    </Button>
                </Link>
                <Button type={"submit"}>Сохранить</Button>
            </Group>
        </form>
    </>
}