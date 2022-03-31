import {Shell} from "@components/Layout/Shell";
import {Avatar, Title, Text, Group, Box} from "@mantine/core";
import useUser from "@hooks/useUser";

export default function Account() {
    const userData = useUser()
    return (
        <Shell>
            <Title order={2}>
                Ваш профиль
            </Title>
            {userData.isSuccess ? <>
                <Group>
                    <Avatar size={"xl"} src={userData.user.avatarURL}/>
                    <Box>
                        <Text>Имя: {userData.user.firstname || ""}</Text>
                        <Text>Фамилия: {userData.user.lastname || ""}</Text>
                    </Box>
                    <Box>
                        <Text>Email: {userData.user.email}</Text>
                        <Text>Email подтвержден: {userData.user.email_verified}</Text>
                    </Box>
                    <Box>
                        <Text>Имя пользователя: {userData.user.username}</Text>
                        <Text>Роль: {userData.user.role}</Text>
                    </Box>
                </Group>
            </> : <>
                <Text>Вы не авторизованы</Text>
            </>}
        </Shell>
    )
}
