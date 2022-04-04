import {Box, Button, Group, LoadingOverlay, Textarea, TextInput, useMantineTheme} from "@mantine/core";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {dropzoneChildren} from "@components/Content/Dropzone";
import {useState} from "react";
import {useForm} from "@mantine/form";
import axios from "axios";
import {CheckIcon} from "@modulz/radix-icons";
import {useNotifications} from "@mantine/notifications";
import {useQueryClient} from "react-query";
import Link from "next/link"
import {useModals} from "@mantine/modals";

interface iconObject {
    data: string
    file: null | File
}

interface initialValues {
    title: string
    description: string
    icon: iconObject
}

export function CourseCreationForm() {
    const modals = useModals()
    const theme = useMantineTheme();
    const notifications = useNotifications()
    const [loading, setLoading] = useState(false)
    const [courseId, setCourseId] = useState('')
    const queryClient = useQueryClient()

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
            axios.post("/api/courses", {
                title: values.title,
                description: values.description,
                iconURL: res.data.url
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
                        icon: <CheckIcon/>
                    })
                    setCourseId(res.data.course.id)
                    queryClient.invalidateQueries("coursesData")
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

    const form = useForm<initialValues>({
        initialValues: {
            title: "",
            description: "",
            icon: {
                data: '',
                file: null
            }
        }
    });

    return <Box mx="auto" sx={{maxWidth: "30rem", position: "relative"}}>
        <LoadingOverlay visible={loading}/>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                required
                label="Название курса"
                placeholder="Курс Абракадабры"
                {...form.getInputProps('title')}
            />

            <Textarea
                required
                label="Описание курса"
                placeholder="Курс Абракадабры"
                {...form.getInputProps('description')}
            />
            <Box my={"md"}>
                <Dropzone
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
                >
                    {(status) => dropzoneChildren(status, theme, form.values.icon.data)}
                </Dropzone>
            </Box>
            <Group position="apart" mt="md">
                {courseId.length === 0 ?
                    <Button type="submit" sx={{backgroundColor: '#228be6 !important'}} disabled>Перейти к
                        курсу</Button> :
                    <Link href={`/courses/${courseId}`} passHref>
                        <Button component="a" onClick={(e) => {
                            modals.closeAll()
                        }}>Перейти к курсу</Button>
                    </Link>}
                <Button type="submit" sx={{backgroundColor: '#228be6 !important'}}>Отправить</Button>
            </Group>
        </form>
    </Box>
}