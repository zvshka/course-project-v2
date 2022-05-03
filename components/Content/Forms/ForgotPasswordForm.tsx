import {Box, Button, Group, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import axios from "axios";
import {useNotifications} from "@mantine/notifications";
import {useModals} from "@mantine/modals";

export default function ForgotPasswordForm() {

    const notifications = useNotifications()
    const modals = useModals()

    const form = useForm({
        initialValues: {
            email: "",
        }
    })

    const handleSubmit = (values: typeof form.values) => {
        axios.post("/api/auth/forgot", {
            email: values.email
        }).then(res => {
            notifications.showNotification({
                color: "green",
                title: "Успех",
                message: res.data.message
            })
            modals.closeAll()
        }).catch(e => {
            notifications.showNotification({
                color: "red",
                title: "Ошибка",
                message: "Во время отправки запроса произошла ошибка"
            })
        })
    }


    return <Box mx="auto" sx={{maxWidth: "30rem", position: "relative"}}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput label={"Email"}
                       required
                       {...form.getInputProps("email")}/>
            <Group mt={"md"}>
                <Button type={"submit"}>Отправить код</Button>
            </Group>
        </form>
    </Box>
}