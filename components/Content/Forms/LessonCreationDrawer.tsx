import {Box, Button, Container, Drawer, Group, Paper, ScrollArea, Title, useMantineTheme} from "@mantine/core";
import dynamic from "next/dynamic";
import {useState} from "react";
import parser from "html-react-parser"

const Editor = dynamic(() => import("@components/Content/Editor"), {
    ssr: false
})

export const LessonCreationDrawer = ({stageId}) => {
    const theme = useMantineTheme()
    const [opened, setOpened] = useState(false)
    const [data, setData] = useState('')
    return <>
        <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            title="Создание урока"
            padding="xl"
            size="full"
            styles={{
                drawer: {
                    backgroundColor: theme.colors.gray[2]
                }
            }}
        >
            <ScrollArea style={{ height: '98%' }}>
                <Container pb={'xl'}>
                    <Title order={3} mb={'md'}>Редактор</Title>
                    <Paper shadow={'xl'}>
                        <Editor data={data} setData={setData}/>
                    </Paper>
                    <Box my={'md'}>
                        <Title order={3}>Предварительный результат</Title>
                        <Paper style={{padding: '0 var(--ck-spacing-standard)'}} shadow={'xl'} className='ck-content'>
                            {parser(data)}
                        </Paper>
                    </Box>
                    <Group position={"right"}>
                        <Button>Сохранить</Button>
                    </Group>
                </Container>
            </ScrollArea>
        </Drawer>
        <Group spacing={'md'} mb={'md'}>
            {/*<Button>Изменить этап</Button>*/}
            <Button onClick={(e) => setOpened(!opened)}>Добавить урок</Button>
            <Button color={"red"}>Удалить этап</Button>
        </Group>
    </>
}