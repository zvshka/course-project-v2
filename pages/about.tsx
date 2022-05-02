import {Anchor, Avatar, Group, List, Paper, Space, Text, Title} from "@mantine/core";
import {BrandGithub, Components, Database, Edit, Engine, PlugConnected} from "tabler-icons-react";

export default function About() {
    return <>
        <Paper shadow={'lg'} p={"sm"}>
            <Group position={"apart"}>
                <Title order={3}>
                    О проекте
                </Title>
            </Group>
        </Paper>
        <Paper p={"sm"} mt={"md"}>
            <Group position={"center"} direction={"column"} spacing={0}>
                <Avatar size={256}
                        src={"https://sun9-44.userapi.com/s/v1/ig2/6yAvQp1jjLExrb8OSeWuWsTmouFcnllRqyOeOf9OSBqTjEp8GDFsZ8abO7kiqPLc214T5voBGgUdciwYXwK8oxwi.jpg?size=1337x2160&quality=95&type=album"}/>
                <Anchor href={"https://vk.com/pushpurs"}><Text size={"xl"}>Пушпурс Андрей Юрьевич</Text></Anchor>
                <Text>Автор проекта</Text>
            </Group>
            <Space m={"xl"}/>
            <Group position={"center"} direction={"column"} spacing={0} sx={{textAlign: "center"}}>
                <Text size={"lg"}>Данный сайт был сделан в качестве практического/курсового задания, темой которых
                    было:</Text>
                <Title order={2}>&quot;Сайт с курсами программирования&quot;</Title>
            </Group>
            <Space m={"xl"}/>
            <Text size={"lg"}>При реализации были использованы следующие технологии:</Text>
            <List withPadding>
                <List.Item icon={<BrandGithub/>}><Anchor
                    href={"https://github.com/zvshka/course-project-v2"}>Github</Anchor> - весь исходный проект хранится
                    на репозитории</List.Item>
                <List.Item icon={<Engine/>}><Anchor href={"https://nextjs.org/"}>Next.js</Anchor> - fullstack фреймворк
                    на языке JS, использующий, как основу, библиотеку React</List.Item>
                <List.Item icon={<Database/>}><Anchor href={"https://www.prisma.io/"}>Prisma</Anchor> - современный ORM
                    нового поколения</List.Item>
                <List.Item icon={<Components/>}><Anchor href={"https://mantine.dev/"}>Mantine</Anchor> - библеотека с
                    большим количеством полезнейший и упрощающий разработку компомнентов</List.Item>
                <List.Item icon={<PlugConnected/>}><Anchor href={"https://react-query.tanstack.com/"}>React
                    Query</Anchor> - Эффективная и мощная синхронизация данных для React</List.Item>
                <List.Item icon={<Edit/>}><Anchor href={"https://ckeditor.com/ckeditor-5/"}>CKEditor 5</Anchor> -
                    редактор текста</List.Item>
            </List>
            <Space m={"xl"}/>
            <Text>Поддержать проект можно добровольно пожертвовав любую сумму при помощи специализированных сервисов,
                которые указаны ниже:</Text>

        </Paper>
    </>
}