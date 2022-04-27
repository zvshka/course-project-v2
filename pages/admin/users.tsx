import {Shell} from "@components/Layout/Shell";
import {ActionIcon, Anchor, Avatar, Badge, Group, ScrollArea, Table, Text, Title, useMantineTheme} from "@mantine/core";
import useUser from "@hooks/useUser";
import useUsers from "@hooks/useUsers";
import {Pencil, Trash} from "tabler-icons-react";
import {useEffect, useState} from "react";

const roleColors = {
    USER: 'blue',
    ADMIN: 'pink',
};

const TableRow = ({item}) => {
    const theme = useMantineTheme()
    return <tr key={item.name}>
        <td>
            <Group spacing="sm">
                <Avatar size={30} src={item.avatarURL} radius={30}/>
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
                    <Pencil size={16}/>
                </ActionIcon>
                <ActionIcon color="red">
                    <Trash size={16}/>
                </ActionIcon>
            </Group>
        </td>
    </tr>
}

export default function Users() {
    const userQuery = useUser()
    const usersQuery = useUsers()
    const [rows, setRows] = useState([])

    useEffect(() => {
        usersQuery.isSuccess && setRows(usersQuery.data.map((item, index) => (
            <TableRow key={index} item={item}/>
        )))
    }, [usersQuery.data, usersQuery.isSuccess])
    return (
        <>
            {userQuery.data && !userQuery.isLoading ? <>
                <Title order={2}>
                    Все пользователи
                </Title>
                <ScrollArea>
                    <Table sx={{minWidth: 800}} verticalSpacing="sm">
                        <thead>
                        <tr>
                            <th>Пользователь</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Роль</th>
                            <th>Email</th>
                            <th>Email подтвержден</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
            </> : <>
                <div>Loading...</div>
            </>}
        </>
    )
}

Users.haveLayout = true
