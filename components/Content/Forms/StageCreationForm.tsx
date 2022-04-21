import {Box, Button, Group, LoadingOverlay, TextInput} from "@mantine/core";
import {useNotifications} from "@mantine/notifications";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {CheckIcon} from "@modulz/radix-icons";
import {useQueryClient} from "react-query";
import {fetcher} from "@lib/fetcher";
import {useModals} from "@mantine/modals";

export default function StageCreationForm({courseId, stage = null}) {
    const modals = useModals()
    const queryClient = useQueryClient()
    const notifications = useNotifications()
    const [loading, setLoading] = useState(false)

    const form = useForm({
        initialValues: {
            title: stage ? stage.title : ''
        }
    })

    const handleSubmit = (values: typeof form.values) => {
        setLoading(true)
        let promise: Promise<any>;
        if (stage) {
            promise = fetcher('/api/stages/' + stage.id, {
                auth: true,
                method: "PATCH",
                data: {
                    title: values.title
                }
            })
        } else {
            promise = fetcher('/api/stages', {
                data: {courseId, title: values.title},
                method: "POST",
                auth: true,
            })
        }

        promise.then(res => {
            setLoading(false)
            notifications.showNotification({
                title: "Успех",
                message: res.data.message,
                color: "green",
                icon: <CheckIcon/>
            })
            queryClient.invalidateQueries(['course', courseId])
            stage ? modals.closeAll() : form.reset()
        }).catch(e => {
            setLoading(false)
            notifications.showNotification({
                title: "Ошибка",
                message: "При создании этапа произошла ошибка",
                color: "red"
            })
        })
    }

    return <Box mx="auto" sx={{maxWidth: "30rem", position: "relative"}}>
        <LoadingOverlay visible={loading}/>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                required
                label="Название этапа"
                placeholder="Этап Абракадабры"
                {...form.getInputProps('title')}
            />
            <Group position="right" mt="md">
                <Button type="submit" sx={{backgroundColor: '#228be6 !important'}}>Отправить</Button>
            </Group>
        </form>
    </Box>
}