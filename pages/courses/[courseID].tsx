import {Shell} from "@components/Layout/Shell";
import {Button, createStyles, Divider, Group, Menu, Text, Title} from "@mantine/core";
import useCourse from "@hooks/useCourse";
import {useRouter} from "next/router";
import {useModals} from "@mantine/modals";
import StageCreationForm from "@components/Content/Forms/StageCreationForm";
import {ArrowsLeftRight, MessageCircle, Photo, Search, Settings, Trash} from "tabler-icons-react";
import {Stage} from "@components/Content/Stage";

const useStyles = createStyles((theme) => ({
    accordionItem: {
        marginTop: theme.spacing.xl,
        backgroundColor: theme.white,
        borderBottom: 0,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.lg,
    },
    control: {
        fontSize: theme.fontSizes.lg,
        padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
        color: theme.black,

        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    content: {
        paddingLeft: theme.spacing.xl,
        lineHeight: 1.6,
        color: theme.black,
    },
}))

const AccordionLabel = ({label}) => {
    return <Group position={"apart"}>
        <Text>{label}</Text>
        <Menu>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item icon={<Settings size={14}/>}>Settings</Menu.Item>
            <Menu.Item icon={<MessageCircle size={14}/>}>Messages</Menu.Item>
            <Menu.Item icon={<Photo size={14}/>}>Gallery</Menu.Item>
            <Menu.Item
                icon={<Search size={14}/>}
                rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
            >
                Search
            </Menu.Item>

            <Divider/>

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item icon={<ArrowsLeftRight size={14}/>}>Transfer my data</Menu.Item>,
            <Menu.Item color="red" icon={<Trash size={14}/>}>Delete my account</Menu.Item>
        </Menu>
    </Group>
}

export default function CoursePage() {
    const {classes} = useStyles()
    const router = useRouter()
    const modals = useModals()
    const courseQuery = useCourse(router.query.courseID)

    const openCreatingModal = () => {
        const id = modals.openModal({
            title: "Создание этапа",
            children: <>
                <StageCreationForm courseId={router.query.courseID}/>
            </>
        })
    }

    return <Shell>
        <Group position={"apart"}>
            <Title order={2}>
                Страница курса
            </Title>
            <Button onClick={openCreatingModal}>
                Создать этап
            </Button>
        </Group>
        {courseQuery.data && courseQuery.data.stages.map((stage, index) => (
            <Stage key={stage.id} stage={stage}/>
        ))}
    </Shell>
}