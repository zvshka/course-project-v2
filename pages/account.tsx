import {Avatar, Box, Button, Grid, Paper, Stack, Text, TextInput, Title} from "@mantine/core";
import useUser from "@hooks/useUser";
import axios from "axios";
import {useQueryClient} from "react-query";
import {useToggle} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import {useEffect} from "react";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";

const handleLink = () => {
    window.location.href = "/api/auth/github?callbackUrl=" + window.location.href
    return
}

export default function Account() {
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

    const handleUnlink = (e) => {
        e.preventDefault()
        axios.get("/api/auth/github/unlink").then(res => {
            queryClient.invalidateQueries("user")
        })
    }

    // const handleLink = (e) => {
    //     e.preventDefault()
    //     router.push("/api/auth/github?callbackUrl=" + getHref())
    // }

    return (
        <>
            <Title order={2}>
                Ваш профиль
            </Title>
            {userQuery.isSuccess ? <>
                <Paper p={'lg'} mt={"md"}>
                    <Grid columns={24}>
                        <Grid.Col xs={12} sm={8}>
                            <Stack align={"center"} justify="flex-start" spacing={'xs'}>
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
                                    {(status) => <Avatar alt={"User Avatar"} size={256} src={form.values.avatar.data}/>}
                                </Dropzone>
                                <Text>{userQuery.data.username}</Text>
                                <Text>{userQuery.data.role}</Text>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col xs={12} sm={16}>
                            <Grid>
                                <Grid.Col xs={6}>
                                    <TextInput label={"Имя"} contentEditable={editable} readOnly={!editable}
                                               value={form.values.firstname} {...form.getInputProps('firstname')}/>
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                    <TextInput label={"Фамилия"} contentEditable={editable} readOnly={!editable}
                                               value={form.values.lastname} {...form.getInputProps('lastname')}/>
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                    <TextInput label={"Email"} contentEditable={false} readOnly
                                               value={userQuery.data.email || ""}/>
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "end",
                                        height: "100%",
                                        width: "100%"
                                    }}>
                                        <Button color={"grape"} sx={{width: "100%"}}>Подтвердить Email</Button>
                                    </Box>
                                </Grid.Col>
                                <Grid.Col xs={12}>
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "end",
                                        height: "100%",
                                        width: "100%"
                                    }}>
                                        {userQuery.isSuccess && !userQuery.data.github &&
                                            <Button color={"dark"} onClick={() => handleLink()} sx={{width: "100%"}}>Привязать
                                                Github</Button>}
                                        {userQuery.isSuccess && userQuery.data.github &&
                                            <Button color={"dark"} onClick={handleUnlink} sx={{width: "100%"}}>Отвязать
                                                Github</Button>}
                                    </Box>
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "end",
                                        height: "100%",
                                        width: "100%"
                                    }}>
                                        <Button color={"indigo"} onClick={handleToggle} sx={{width: "100%"}}>
                                            {editable ? "Сохранить данные" : "Изменить данные"}
                                        </Button>
                                    </Box>
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "end",
                                        height: "100%",
                                        width: "100%"
                                    }}>
                                        <Button color={"violet"} onClick={handleUnlink} sx={{width: "100%"}}>Изменить
                                            пароль</Button>
                                    </Box>
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </> : <>
                <Text>Вы не авторизованы</Text>
            </>}
        </>
    )
}

Account.haveLayout = true
