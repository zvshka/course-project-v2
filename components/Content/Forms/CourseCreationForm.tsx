import {Box, Button, Group, LoadingOverlay, MultiSelect, Textarea, TextInput, useMantineTheme} from "@mantine/core";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {dropzoneChildren} from "@components/Content/Dropzone";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {CheckIcon} from "@modulz/radix-icons";
import {useNotifications} from "@mantine/notifications";
import {useQueryClient} from "react-query";
import Link from "next/link"
import {useModals} from "@mantine/modals";
import useBadges from "@hooks/useBadges";
import {useListState} from "@mantine/hooks";
import {fetcher} from "@lib/fetcher";

interface iconObject {
    data: string
    file: null | File
}

interface initialValues {
    title: string
    description: string
    badges: string[]
    icon: iconObject
}

export function CourseCreationForm() {
    const modals = useModals()
    const theme = useMantineTheme();
    const notifications = useNotifications()
    const [loading, setLoading] = useState(false)
    const [courseId, setCourseId] = useState('')
    const queryClient = useQueryClient()
    const badgesQuery = useBadges()
    const [badges, badgesHandlers] = useListState([])

    useEffect(() => {
        badgesQuery.isSuccess && badgesHandlers.setState(badgesQuery.data.map(badge => ({
            value: badge.id,
            label: badge.label
        })))
    }, [badgesQuery.data, badgesQuery.isSuccess])

    const uploadImage = (file) => {
        const formData = new FormData()
        formData.append('upload', file)
        return fetcher("/api/images", {
            method: 'POST',
            data: formData,
            auth: true,
            headers: {
                "Content-Type": 'multipart/form-data',
            }
        })
    }

    const uploadCourse = (values: typeof form.values, iconURL = null) => {
        fetcher("/api/courses", {
            method: 'POST',
            data: {
                title: values.title,
                description: values.description,
                iconURL,
                badges: values.badges
            },
            auth: true
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
                queryClient.invalidateQueries("courses")
                form.reset()
            })
            .catch(error => {
                setLoading(false)
                notifications.showNotification({
                    title: "Ошибка",
                    message: "При создании курса произошла ошибка",
                    color: "red"
                })
            })
    }

    const handleSubmit = (values: typeof form.values) => {
        setLoading(true)
        if (values.icon.file) {
            uploadImage(values.icon.file).then(res => {
                uploadCourse(values, res.data.url)
            })
        } else {
            uploadCourse(values)
        }
    }

    const createBadge = (query) => {
        fetcher('/api/badges', {
            method: 'POST',
            data: {
                label: query
            },
            auth: true
        }).then(res => {
            notifications.showNotification({
                title: "Успех",
                message: "Категория была успешно создана",
                color: "green",
                icon: <CheckIcon/>
            })
            queryClient.invalidateQueries("badges")
            form.setFieldValue('badges', [...form.values.badges, res.data.id])
        }).catch(e => {
            notifications.showNotification({
                title: "Ошибка",
                message: "При создании категории произошла ошибка",
                color: "red"
            })
        })
    }

    const form = useForm<initialValues>({
        initialValues: {
            title: "",
            description: "",
            badges: [],
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

            <MultiSelect
                label="Выбор тегов"
                data={badges}
                value={form.values.badges}
                placeholder="Выбери теги"
                searchable
                creatable
                clearable
                getCreateLabel={(query) => `+ Создать ${query}`}
                onCreate={createBadge}
                {...form.getInputProps('badges')}
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