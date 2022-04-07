import {Shell} from "@components/Layout/Shell";
import {Avatar, Title, Text, Group, Box} from "@mantine/core";
import useUser from "@hooks/useUser";

export default function Account() {
    const userQuery = useUser()
    return (
        <Shell>
            <Title order={2}>
                Ваш профиль
            </Title>
            {userQuery.isSuccess ? <>
                <Group>
                    <Avatar size={"xl"} src={userQuery.data.avatarURL}/>
                    <Box>
                        <Text>Имя: {userQuery.data.firstname || ""}</Text>
                        <Text>Фамилия: {userQuery.data.lastname || ""}</Text>
                    </Box>
                    <Box>
                        <Text>Email: {userQuery.data.email}</Text>
                        <Text>Email подтвержден: {userQuery.data.email_verified}</Text>
                    </Box>
                    <Box>
                        <Text>Имя пользователя: {userQuery.data.username}</Text>
                        <Text>Роль: {userQuery.data.role}</Text>
                    </Box>
                </Group>
            </> : <>
                <Text>Вы не авторизованы</Text>
            </>}
        </Shell>
    )
}
