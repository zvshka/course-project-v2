import {useModals} from "@mantine/modals";
import {Box, Button, Group, LoadingOverlay, TextInput, useMantineTheme} from "@mantine/core";
import {useNotifications} from "@mantine/notifications";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {CheckIcon} from "@modulz/radix-icons";
import {useQueryClient} from "react-query";
import {fetcher} from "@lib/utils";

export default function StageCreationForm({courseId}) {
    const modals = useModals()
    const theme = useMantineTheme()
    const queryClient = useQueryClient()
    const notifications = useNotifications()
    const [loading, setLoading] = useState(false)

    const form = useForm({
        initialValues: {
            title: ''
        }
    })

    const handleSubmit = (values: typeof form.values) => {
        setLoading(true)
        fetcher('/api/stages', {
            data: {
                courseId,
                title: values.title
            },
            method: 'POST',
            auth: true,
        }).then(res => {
            setLoading(false)
            notifications.showNotification({
                title: "Успех",
                message: "Этап был успешно создан",
                color: "green",
                icon: <CheckIcon/>
            })
            queryClient.invalidateQueries(['course', courseId])
            form.reset()
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