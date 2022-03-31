import {Shell} from "@components/Layout/Shell";
import {ScrollArea, Title, Table, Group, Text, Badge, Anchor, Avatar, ActionIcon, useMantineTheme} from "@mantine/core";
import useUser from "@hooks/useUser";
import useUsers from "@hooks/useUsers";
import {useRouter} from "next/router";
import {Pencil, Trash} from "tabler-icons-react";
import {useEffect, useState} from "react";

const roleColors = {
    USER: 'blue',
    ADMIN: 'pink',
};

export default function Users() {
    const theme = useMantineTheme()
    const userData = useUser()
    const usersData = useUsers()
    const router = useRouter()
    const [rows, setRows] = useState([])
    useEffect(() => {
        usersData.isSuccess && setRows(usersData.users.map((item) => (
            <tr key={item.name}>
                <td>
                    <Group spacing="sm">
                        <Avatar size={30} src={item.avatarURL} radius={30} />
                        <Text size="sm" weight={500}>
                            {item.username}
                        </Text>
                    </Group>
                </td>

                <td>
                    <Text size="sm" color="gray">
                        {item.firstname}
                    </Text>
                </td>

                <td>
                    <Text size="sm" color="gray">
                        {item.lastname}
                    </Text>
                </td>

                <td>
                    <Badge
                        color={roleColors[item.role.toLowerCase()]}
                        variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
                    >
                        {item.role}
                    </Badge>
                </td>
                <td>
                    <Anchor<'a'> size="sm" href="#" onClick={(event) => event.preventDefault()}>
                        {item.email}
                    </Anchor>
                </td>
                <td>
                    <Text size="sm" color="gray">
                        {item.email_verified}
                    </Text>
                </td>
                <td>
                    <Group spacing={0} position="right">
                        <ActionIcon>
                            <Pencil size={16} />
                        </ActionIcon>
                        <ActionIcon color="red">
                            <Trash size={16} />
                        </ActionIcon>
                    </Group>
                </td>
            </tr>
        )))
    }, [usersData.isSuccess])
    return (
        <Shell>
            {userData.user && !userData.isLoading ? <>
                <Title order={2}>
                    Все пользователи
                </Title>
                <ScrollArea>
                    <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                        <thead>
                        <tr>
                            <th>Пользователь</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Роль</th>
                            <th>Email</th>
                            <th>Email подтвержден</th>
                            <th />
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
            </> : <>
                <div>Loading...</div>
            </>}
        </Shell>
    )
}
