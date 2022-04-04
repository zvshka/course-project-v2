import useCourses from "@hooks/useCourses";
import {Shell} from "@components/Layout/Shell";
import {Box, Button, Group, LoadingOverlay, Select, TextInput, Title, useMantineTheme} from "@mantine/core";
import {useEffect, useState} from "react";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {dropzoneChildren} from "@components/Content/Dropzone";
import {useNotifications} from "@mantine/notifications";
import {useForm} from "@mantine/form";
import axios from "axios";
import {CheckIcon} from "@modulz/radix-icons";

interface iconObject {
    data: string
    file: null | File
}

interface initialValues {
    title: string
    selectedCourse: string
    icon: iconObject
}

export default function CreateStage() {
    const theme = useMantineTheme()
    const coursesData = useCourses()
    const [data, setData] = useState([])
    const notifications = useNotifications()
    const [loading, setLoading] = useState(false)
    const form = useForm<initialValues>({
        initialValues: {
            title: "",
            selectedCourse: "",
            icon: {
                data: '',
                file: null
            }
        }
    });

    const handleSubmit = (values: typeof form.values) => {
        const formData = new FormData()
        formData.append('upload', form.values.icon.file)
        setLoading(true)
        axios.post("/api/images", formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": 'Bearer ' + localStorage.getItem('accessToken')
            }
        }).then(res => {
            axios.post("/api/stages", {
                title: values.title,
                iconURL: res.data.url,
                courseId: values.selectedCourse,
            }, {
                headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
                .then(res => {
                    setLoading(false)
                    notifications.showNotification({
                        title: "Успех",
                        message: "Курс был успешно создан",
                        color: "green",
                        icon: <CheckIcon />
                    })
                })
                .catch(error => {
                    setLoading(false)
                    notifications.showNotification({
                        title: "Ошибка",
                        message: "При создании курса произошла ошибка",
                        color: "red"
                    })
                })
        })
            .catch(error => {
                setLoading(false)
                notifications.showNotification({
                    title: "Ошибка",
                    message: "При загрузке изображения произошла ошибка",
                    color: "red"
                })
            })
    }

    useEffect(() => {
        coursesData.isSuccess && setData(coursesData.courses.map(course => ({value: course.id, label: course.title})))
    }, [coursesData.isSuccess, coursesData.isLoading])

    return <Shell>
        <Title order={2} sx={{textAlign: "center"}}>
            Создание этапа курса
        </Title>
        <Box mx="auto" sx={{maxWidth: "30rem", position: "relative"}}>
            <LoadingOverlay visible={loading}/>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Select data={data}
                        label="Выбери курс, для которого хочешь создать этап"
                        placeholder="Выбери один"
                        searchable
                        clearable
                        nothingFound="Ничего не найдено"
                        {...form.getInputProps('selectedCourse')}
                />
                <TextInput disabled={!form.values.selectedCourse || form.values.selectedCourse.length === 0}
                           label='Заголовок этапа'
                           {...form.getInputProps('title')}
                />
                <Dropzone
                    disabled={!form.values.selectedCourse || form.values.selectedCourse.length === 0}
                    onDrop={(files) => {
                        const reader = new FileReader()
                        reader.onload = (e) => {
                            form.setFieldValue('icon', {
                                data: e.target.result as string,
                                file: files[0]
                            })
                        }

                        reader.readAsDataURL(files[0])
                    }}
                    multiple={false}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={3 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                    my={"md"}
                >
                    {(status) => dropzoneChildren(status, theme, form.values.icon.data)}
                </Dropzone>
                <Group position="right" mt="md">
                    <Button type="submit"
                            disabled={!form.values.selectedCourse || form.values.selectedCourse.length === 0}
                            sx={{backgroundColor: '#228be6 !important'}}>Отправить</Button>
                </Group>
            </form>
        </Box>
    </Shell>
}