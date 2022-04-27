import {Box, Button, Group, Paper, Select, TextInput, Title, useMantineTheme} from "@mantine/core";
import parser from "html-react-parser";
import {useNotifications} from "@mantine/notifications";
import {useQueryClient} from "react-query";
import {useForm} from "@mantine/form";
import {CheckIcon} from "@modulz/radix-icons";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import useCourse from "@hooks/useCourse";
import useCourses from "@hooks/useCourses";
import {useEffect, useState} from "react";
import axios from "axios";

const Editor = dynamic(() => import("@components/Content/Editor"), {
    ssr: false
})

export default function LessonCreation() {
    const router = useRouter()
    const {courseId, stageId} = router.query
    const theme = useMantineTheme()
    const notifications = useNotifications()
    const queryClient = useQueryClient()
    const [course, setCourse] = useState("")

    useEffect(() => {
        setCourse(courseId as string)
    }, [courseId])

    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            text: '',
            stageId: null
        }
    })

    useEffect(() => {
        form.setFieldValue('stageId', stageId)
    }, [stageId])

    const handleSubmit = (values: typeof form.values) => {
        axios.post('/api/lessons', values).then(res => {
            notifications.showNotification({
                title: "Успех",
                message: res.data.message,
                color: "green",
                icon: <CheckIcon/>
            })
            // queryClient.invalidateQueries(['course', stage.courseId])
        }).catch(e => {
            console.error(e)
            notifications.showNotification({
                title: "Ошибка",
                message: "При создании урока произошла ошибка",
                color: "red"
            })
        })
    }

    const coursesQuery = useCourses()
    const [courses, setCourses] = useState([])
    useEffect(() => {
        if (coursesQuery.isSuccess && coursesQuery.data) {
            setCourses(coursesQuery.data.map((course => ({label: course.title, value: course.id}))))
        }
    }, [coursesQuery.isSuccess, coursesQuery.data])

    const courseQuery = useCourse(course)
    const [stages, setStages] = useState([])
    useEffect(() => {
        if (courseQuery.isSuccess && courseQuery.data) {
            setStages(courseQuery.data.stages.map((stage) => ({label: stage.title, value: stage.id})))
        } else {
            setStages([])
        }
    }, [courseQuery.isSuccess, courseQuery.data])
    // const lessonQuery = useLesson(lessonId)

    return <>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Select label={'Курс'}
                    data={courses}
                    clearable
                    searchable
                    required
                    value={course}
                    onChange={(value) => setCourse(value)}/>

            <Select label={'Этап'}
                    data={stages}
                    clearable
                    searchable
                    required
                    value={form.values.stageId}
                    {...form.getInputProps('stageId')}
            />
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
            <Group position={"right"}>
                <Button type={"submit"}>Сохранить</Button>
            </Group>
        </form>
    </>
}

LessonCreation.haveLayout = true