import {
    Box,
    Button,
    Container,
    Drawer,
    Group,
    Paper,
    ScrollArea,
    Text,
    TextInput,
    Title,
    useMantineTheme
} from "@mantine/core";
import dynamic from "next/dynamic";
import parser from "html-react-parser"
import {useForm} from "@mantine/form";
import {CheckIcon} from "@modulz/radix-icons";
import {useNotifications} from "@mantine/notifications";
import {useQueryClient} from "react-query";
import {fetcher} from "@lib/fetcher";

const Editor = dynamic(() => import("@components/Content/Editor"), {
    ssr: false
})

export const LessonCreationDrawer = ({stage, setOpened, opened}) => {
    const theme = useMantineTheme()
    const notifications = useNotifications()
    const queryClient = useQueryClient()
    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            text: ''
        }
    })

    const handleSubmit = (values: typeof form.values) => {
        fetcher('/api/lessons', {
            method: 'POST',
            data: {...values, stageId: stage.id},
            auth: true
        }).then(res => {
            notifications.showNotification({
                title: "Успех",
                message: res.data.message,
                color: "green",
                icon: <CheckIcon/>
            })
            queryClient.invalidateQueries(['course', stage.courseId])
        }).catch(e => {
            console.error(e)
            notifications.showNotification({
                title: "Ошибка",
                message: "При создании урока произошла ошибка",
                color: "red"
            })
        })
    }

    const DrawerTitle = () => {
        return <Box>
            <Title order={3}>Создание урока</Title>
            <Text>Для этапа: {stage.title}</Text>
        </Box>
    }

    return <>
        <Drawer opened={opened}
                onClose={() => setOpened()}
                title={<DrawerTitle/>}
                padding="xl"
                size="full"
                styles={{drawer: {backgroundColor: theme.colors.gray[2]}}}>
            <ScrollArea style={{height: '98%'}}>
                <Container pb={'xl'}>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <TextInput label={"Название"} required
                                   placeholder={'Название'} {...form.getInputProps('title')}/>
                        <TextInput label={"Краткое описание"} required
                                   placeholder={'Описание'} {...form.getInputProps('description')}/>
                        <Title order={3} mb={'md'}>Редактор</Title>
                        <Paper shadow={'xl'}>
                            <Editor data={form.values.text} setData={form.getInputProps('text').onChange}/>
                        </Paper>
                        <Box my={'md'}>
                            <Title order={3}>Предварительный результат</Title>
                            <Paper px={theme.spacing.sm} py={theme.spacing.sm / 4} shadow={'xl'}
                                   className='ck-content'>
                                {parser(form.values.text)}
                            </Paper>
                        </Box>
                        <Group position={"right"}>
                            <Button type={"submit"}>Сохранить</Button>
                        </Group>
                    </form>
                </Container>
            </ScrollArea>
        </Drawer>
    </>
}