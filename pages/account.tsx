import {Avatar, Box, Button, Group, Paper, Stack, Text, TextInput, Title} from "@mantine/core";
import useUser from "@hooks/useUser";
import Link from "next/link";

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
                                <TextInput label={"Имя"} contentEditable={false} readOnly
                                           value={userQuery.data.firstname || ""}/>
                                <TextInput label={"Фамилия"} contentEditable={false} readOnly
                                           value={userQuery.data.lastname || ""}/>
                            </Group>
                            <Group grow>
                                <TextInput label={"Email"} contentEditable={false} readOnly
                                           value={userQuery.data.email || ""}/>
                                {userQuery.isSuccess && !userQuery.data.github &&
                                    <Link href={"/api/auth/github"} passHref>
                                        <Button component={"a"}>Привязать Github</Button>
                                    </Link>}
                                {userQuery.isSuccess && userQuery.data.github &&
                                    <Link href={"/api/auth/github"} passHref>
                                        <Button component={"a"}>Отвязать Github</Button>
                                    </Link>}
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
