import {Avatar, Box, Button, Group, Paper, Stack, Text, TextInput, Title} from "@mantine/core";
import useUser from "@hooks/useUser";

export default function Account() {
    const userQuery = useUser()
    return (
        <>
            <Title order={2}>
                Ваш профиль
            </Title>
            {userQuery.isSuccess ? <>
                <Paper p={'lg'}>
                    <Box sx={{display: 'flex'}}>
                        <Stack align={"center"} justify="flex-start" spacing={'xs'}>
                            <Avatar alt={"User Avatar"} size={256} src={userQuery.data.avatarURL}/>
                            <Text>
                                {userQuery.data.username}
                            </Text>
                            <Text>{userQuery.data.role}</Text>
                        </Stack>
                        <Box sx={(theme) => ({
                            marginLeft: theme.spacing.md,
                            width: "100%"
                        })}>
                            <Group grow>
                                {/*{userQuery.data.firstname || ""}*/}
                                <TextInput label={"Имя"} contentEditable={false} value={userQuery.data.firstname || ""}/>
                                <TextInput label={"Фамилия"} contentEditable={false} value={userQuery.data.lastname || ""}/>
                            </Group>
                            <Group grow>
                                <TextInput label={"Email"} contentEditable={false} value={userQuery.data.email || ""}/>
                            </Group>
                        </Box>
                    </Box>
                </Paper>
            </> : <>
                <Text>Вы не авторизованы</Text>
            </>}
        </>
    )
}
