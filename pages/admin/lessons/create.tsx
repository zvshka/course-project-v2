import {Shell} from "@components/Layout/Shell";
import {Box, Button, Group, LoadingOverlay, Select, TextInput, Title} from "@mantine/core";
import {useNotifications} from "@mantine/notifications";
import {useEffect, useState} from "react";
import useCourses from "@hooks/useCourses";
import useCourse from "@hooks/useCourse";
import dynamic from "next/dynamic";
import {useForm} from "@mantine/form";
import axios from "axios";
import {CheckIcon} from "@modulz/radix-icons";

const Editor = dynamic(() => import("@components/Content/Editor"), {
    ssr: false
})

interface initialValues {
    title: string
    selectedStage: string
    description: string
}

export default function CreateLesson() {
    const notifications = useNotifications()
    const coursesData = useCourses()
    const [mappedCourses, setMappedCourses] = useState([])
    const [mappedStages, setMappedStages] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState('')

    const selectedCourseData = useCourse(selectedCourse)

    const form = useForm<initialValues>({
        initialValues: {
            title: "",
            selectedStage: "",
            description: ""
        }
    });

    const handleSubmit = (values: typeof form.values) => {
        setLoading(true)
        axios.post("/api/lessons", {
            title: values.title,
            stageId: values.selectedStage,
            description: values.description
        }, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('accessToken')
            }
        }).then(res => {
            setLoading(false)
            notifications.showNotification({
                title: "Успех",
                message: "Урок был успешно создан",
                color: "green",
                icon: <CheckIcon />
            })
        }).catch(e => {
            setLoading(false)
            notifications.showNotification({
                title: "Ошибка",
                message: "При создании урока произошла ошибка",
                color: "red"
            })
        })
    }

    useEffect(() => {
        coursesData.isSuccess && setMappedCourses(coursesData.courses.map(course => ({
            value: course.id,
            label: course.title
        })))
    }, [coursesData.isSuccess, coursesData.isLoading])

    useEffect(() => {
        selectedCourseData.isSuccess && setMappedStages(selectedCourseData.course.stages.map(stage => ({
            value: stage.id,
            label: stage.title
        })))
    }, [selectedCourseData.isSuccess, selectedCourseData.isLoading])

    return <Shell>
        <Title order={2} sx={{textAlign: "center"}}>
            Создание урока этапа курса
        </Title>
        <Box mx="auto" sx={{position: "relative"}}>
            <LoadingOverlay visible={loading}/>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Select data={mappedCourses}
                        label="Выбери курс, для которого хочешь создать этап"
                        placeholder="Выбери один"
                        searchable
                        clearable
                        required
                        nothingFound="Ничего не найдено"
                        onChange={setSelectedCourse}
                />

                <Select data={mappedStages}
                        label="Выбери этап, для которого хочешь создать урок"
                        placeholder="Выбери один"
                        searchable
                        clearable
                        required
                        disabled={!selectedCourse || selectedCourse.length === 0}
                        nothingFound="Ничего не найдено"
                        {...form.getInputProps('selectedStage')}
                />

                <TextInput disabled={!form.values.selectedStage || form.values.selectedStage.length === 0}
                           label='Заголовок урока'
                           required
                           {...form.getInputProps('title')}
                />

                <Box my={'md'}>
                    <Editor data={form.values.description} setData={form.getInputProps('description').onChange}/>
                </Box>
                <Group position="right" mt="md">
                    <Button type="submit"
                            disabled={!form.values.selectedStage || form.values.selectedStage.length === 0}
                            sx={{backgroundColor: '#228be6 !important'}}>Отправить</Button>
                </Group>
            </form>
        </Box>
    </Shell>
}