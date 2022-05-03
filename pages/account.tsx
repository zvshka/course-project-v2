import {Avatar, Box, Button, Container, createStyles, Group, Paper, Text, TextInput, Title} from "@mantine/core";
import useUser from "@hooks/useUser";
import axios from "axios";
import {useQueryClient} from "react-query";
import {useToggle} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import {useEffect} from "react";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {BrandGithub, DeviceFloppy, LockOpen, Pencil} from "tabler-icons-react";
import {useNotifications} from "@mantine/notifications";

const handleLink = () => {
    window.location.href = "/api/auth/github?callbackUrl=" + window.location.href
    return
}

const useStyles = createStyles((theme) => ({
    buttonsGroup: {
        flexDirection: "row",
        width: "100%",
        [theme.fn.smallerThan("md")]: {
            "&": {
                flexDirection: "column"
            }
        }
    },
}))

export default function Account() {
    const {classes} = useStyles()
    const notifications = useNotifications()
    const userQuery = useUser()
    const queryClient = useQueryClient()
    const [editable, toggleEditable] = useToggle(false, [true, false])
    const form = useForm({
        initialValues: {
            firstname: "",
            lastname: "",
            avatar: {
                data: '',
                file: null
            }
        }
    })

    useEffect(() => {
        if (userQuery.isSuccess && userQuery.data) {
            form.setValues({
                firstname: userQuery.data.firstname || "",
                lastname: userQuery.data.lastname || "",
                avatar: {
                    data: userQuery.data.avatarURL,
                    file: null
                }
            })

        }
    }, [userQuery.isSuccess, userQuery.data])

    const uploadImage = (file) => {
        const formData = new FormData()
        formData.append('upload', file)
        return axios.post("/api/images", formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
            }
        })
    }

    const updateData = (values, avatarURL = null) => {
        axios.patch("/api/users/" + userQuery.data.id, {
            lastname: values.lastname,
            firstname: values.firstname,
            avatarURL
        })
            .then(res => {
                queryClient.invalidateQueries("user")
            })
            .catch(e => {
                console.error(e)
            })

    }

    const updateAccount = () => {
        const values = form.values
        if (values.avatar.file) {
            uploadImage(values.avatar.file).then(res => {
                updateData(values, res.data.url)
            })
        } else {
            updateData(values)
        }
    }

    const handleToggle = (e) => {
        e.preventDefault()
        toggleEditable()
        if (!editable) return
        updateAccount()
    }

    const handleUnlink = () => {
        axios.get("/api/auth/github/unlink").then(res => {
            queryClient.invalidateQueries("user")
        })
    }

    const handleGithubButtonClick = (e) => {
        e.preventDefault()
        if (userQuery.isSuccess && userQuery.data) {
            if (userQuery.data.github.id) {
                handleUnlink()
            } else {
                handleLink()
            }
        }
    }

    const handleResetPassword = () => {
        axios.post("/api/auth/forgot", {
            email: userQuery?.data?.email
        }).then(res => {
            notifications.showNotification({
                color: "green",
                title: "Успех",
                message: res.data.message
            })
        }).catch(e => {
            notifications.showNotification({
                color: "red",
                title: "Ошибка",
                message: "Во время отправки запроса произошла ошибка"
            })
        })
    }

    const sendVerification = () => {
        axios.post("/api/auth/confirm").then(res => {
            notifications.showNotification({
                color: "green",
                title: "Успех",
                message: res.data.message
            })
        }).catch(e => {
            notifications.showNotification({
                color: "red",
                title: "Ошибка",
                message: "Во время отправки запроса произошла ошибка"
            })
        })
    }

    return (
        <>
            <Paper shadow={'lg'} p={"sm"}>
                <Group position={"apart"}>
                    <Title order={3}>
                        Ваш профиль
                    </Title>
                </Group>
            </Paper>
            <Paper mt={"md"} p={"sm"}>
                {userQuery.isSuccess ? <>
                    <Container size={"xs"} sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <Dropzone sx={(theme) => ({padding: theme.spacing.sm / 4})} disabled={!editable}
                                      onDrop={(files) => {
                                          const reader = new FileReader()
                                          reader.onload = (e) => {
                                              form.setFieldValue('avatar', {
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
                                {(status) => <Avatar alt={"User Avatar"} size={224} src={form.values.avatar.data}/>}
                            </Dropzone>
                            <Text weight={700} size={"lg"}>{userQuery.data.username}</Text>
                            <Text>{userQuery.data.role}</Text>
                        </Box>
                        <TextInput label={"Имя"}
                                   contentEditable={editable}
                                   readOnly={!editable}
                                   value={form.values.firstname}
                                   {...form.getInputProps('firstname')}/>
                        <TextInput label={"Фамилия"}
                                   contentEditable={editable}
                                   readOnly={!editable}
                                   value={form.values.lastname}
                                   {...form.getInputProps('lastname')}/>
                        <TextInput label={"Email"}
                                   contentEditable={false}
                                   readOnly
                                   value={userQuery.data.email || ""}/>
                        <Group grow my={"md"} className={classes.buttonsGroup}>
                            <Button onClick={sendVerification}>Подтвердить Email</Button>
                            <Button color={"dark"}
                                    onClick={handleGithubButtonClick}
                                    leftIcon={<BrandGithub size={18}/>}>
                                {userQuery.isSuccess && userQuery.data && userQuery.data.github.id ?
                                    "Отвязать Github" :
                                    "Привязать Github"}
                            </Button>
                        </Group>
                        <Group grow className={classes.buttonsGroup}>
                            <Button leftIcon={!editable ? <DeviceFloppy size={18}/> : <Pencil size={18}/>}
                                    onClick={handleToggle}>
                                {editable ? "Сохранить данные" : "Изменить данные"}
                            </Button>
                            <Button onClick={handleResetPassword} leftIcon={<LockOpen size={18}/>}>
                                Изменить пароль
                            </Button>
                        </Group>
                    </Container>
                </> : <>
                    <Text>Это мог бы быть ваш профиль, но вы не авторизованы...</Text>
                </>}
            </Paper>
        </>
    )
}
