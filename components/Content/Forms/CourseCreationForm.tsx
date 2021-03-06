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
import axios from "axios";

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

export function CourseCreationForm({course = null}) {
    const modals = useModals()
    const theme = useMantineTheme();
    const notifications = useNotifications()
    const queryClient = useQueryClient()
    const badgesQuery = useBadges()
    const [loading, setLoading] = useState(false)
    const [courseId, setCourseId] = useState('')
    const [badges, setBadges] = useState([])

    useEffect(() => {
        if (badgesQuery.isSuccess && badgesQuery.data) {
            setBadges(badgesQuery.data.map(badge => ({
                value: badge.id,
                label: badge.label
            })))
        }
    }, [badgesQuery.data, badgesQuery.isSuccess])

    const uploadImage = (file) => {
        const formData = new FormData()
        formData.append('upload', file)
        return axios.post("/api/images", formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
            }
        })
    }

    const uploadCourse = (values: typeof form.values, iconURL = null) => {
        let promise;
        const data = {
            title: values.title,
            description: values.description,
            iconURL,
            badges: values.badges
        }
        if (course) {
            promise = axios.patch("/api/courses/" + course.id, data)
        } else {
            promise = axios.post("/api/courses", data)
        }

        promise.then(res => {
            setLoading(false)
            notifications.showNotification({
                title: "??????????",
                message: res.data.message,
                color: "green",
                icon: <CheckIcon/>
            })
            setCourseId(res.data.courseId)
            queryClient.invalidateQueries("courses").catch(e => console.log(e))
            if (course) {
                modals.closeAll()
            } else {
                // form.reset()
            }
        })
            .catch(error => {
                setLoading(false)
                notifications.showNotification({
                    title: "????????????",
                    message: error.message,
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
        axios.post('/api/badges', {
            label: query
        }).then(res => {
            notifications.showNotification({
                title: "??????????",
                message: "?????????????????? ???????? ?????????????? ??????????????",
                color: "green",
                icon: <CheckIcon/>
            })
            queryClient.invalidateQueries("badges").catch(e => console.log(e))
            form.setFieldValue('badges', [...form.values.badges, res.data.id])
        }).catch(e => {
            console.log(e)
            notifications.showNotification({
                title: "????????????",
                message: "?????? ???????????????? ?????????????????? ?????????????????? ????????????",
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

    useEffect(() => {
        if (course) {
            form.setValues({
                title: course.title,
                description: course.description,
                badges: course.badges.map(b => b.id),
                icon: {
                    data: course.iconURL,
                    file: null
                }
            })
        }
    }, [course])

    return <Box mx="auto" sx={{maxWidth: "30rem", position: "relative"}}>
        <LoadingOverlay visible={loading}/>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                required
                label="???????????????? ??????????"
                placeholder="???????? ??????????????????????"
                {...form.getInputProps('title')}
            />
            <Textarea
                required
                label="???????????????? ??????????"
                placeholder="???????? ??????????????????????"
                {...form.getInputProps('description')}
            />

            <MultiSelect
                label="?????????? ??????????"
                data={badges}
                value={form.values.badges}
                placeholder="???????????? ????????"
                searchable
                creatable
                clearable
                getCreateLabel={(query) => `+ ?????????????? ${query}`}
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
                    <Button type="submit" sx={{backgroundColor: '#228be6 !important'}} disabled>?????????????? ??
                        ??????????</Button> :
                    <Link href={`/courses/${courseId}`} passHref>
                        <Button component="a" onClick={() => {
                            modals.closeAll()
                        }}>?????????????? ?? ??????????</Button>
                    </Link>}
                <Button type="submit" sx={{backgroundColor: '#228be6 !important'}}>??????????????????</Button>
            </Group>
        </form>
    </Box>
}