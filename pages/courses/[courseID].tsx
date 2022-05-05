import {Button, Group, Menu, Paper, Text, Title, useMantineTheme} from "@mantine/core";
import useCourse from "@hooks/useCourse";
import {useRouter} from "next/router";
import {useModals} from "@mantine/modals";
import StageCreationForm from "@components/Content/Forms/StageCreationForm";
import {useListState, useToggle} from "@mantine/hooks";
import {useEffect} from "react";
import {CheckIcon} from "@modulz/radix-icons";
import {useNotifications} from "@mantine/notifications";
import {useQueryClient} from "react-query";
import useUser from "@hooks/useUser";
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {Stage} from "@components/Content/Stage";
import axios from "axios";
import Link from "next/link";
import {restrictToVerticalAxis, restrictToWindowEdges,} from '@dnd-kit/modifiers';

export default function CoursePage() {
    const theme = useMantineTheme()
    const userQuery = useUser()
    const router = useRouter()
    const modals = useModals()
    const notifications = useNotifications()
    const queryClient = useQueryClient()
    const [draggable, toggleDragging] = useToggle(false, [true, false])

    const courseQuery = useCourse(router.query.courseID)
    const [stages, stagesHandlers] = useListState([])

    useEffect(() => {
        if (userQuery.isSuccess && userQuery.data) {
            if (router.query.courseID) {
                axios.post("/api/courses/visit", {
                    courseId: router.query.courseID
                }).catch(console.log)
            }
        }
    }, [userQuery.isSuccess, userQuery.data])

    useEffect(() => {
        if (courseQuery.isSuccess && courseQuery.data) {
            stagesHandlers.setState(courseQuery.data.stages)
        }
    }, [courseQuery.data, courseQuery.isSuccess])

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: null,
        }),
        useSensor(TouchSensor, {
            activationConstraint: null,
        }),
        useSensor(KeyboardSensor, {
            // Disable smooth scrolling in Cypress automated tests
            // scrollBehavior: 'Cypress' in window ? 'auto' : undefined,
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event) {
        const {active, over} = event;
        const oldIndex = stages.indexOf(stages.find(item => item.id === active.id));
        const newIndex = stages.indexOf(stages.find(item => item.id === over.id));
        if (active.id !== over.id) {
            stagesHandlers.reorder({from: oldIndex, to: newIndex})
        }
    }

    const handleToggle = () => {
        toggleDragging()
        if (!draggable) return
        const toUpdate = stages.map((stage, index) => ({id: stage.id, position: index + 1}))
        axios.patch('/api/stages', toUpdate).then(res => {
            notifications.showNotification({
                title: "Успех",
                message: res.data.message,
                color: "green",
                icon: <CheckIcon/>
            })
            queryClient.invalidateQueries(['course', router.query.courseID])
        }).catch(_ => {
            notifications.showNotification({
                title: "Ошибка",
                message: "При изменении порядка произошла ошибка",
                color: "red"
            })
        })
    }

    const openCreatingModal = () => {
        modals.openModal({
            title: "Создание этапа",
            children: <StageCreationForm courseId={router.query.courseID}/>
        })
    }

    return <>
        <Paper shadow={'lg'} p={'sm'} mb={"md"}>
            <Group position={"apart"}>
                <Group grow>
                    <Link href={"/courses"} passHref>
                        <Button component={"a"}>
                            Назад к курсам
                        </Button>
                    </Link>
                </Group>
                {userQuery.isSuccess && userQuery.data && userQuery.data.role === "ADMIN" && <Menu>
                    <Menu.Label>Административное меню</Menu.Label>
                    <Menu.Item onClick={openCreatingModal}>
                        Создать этап
                    </Menu.Item>
                    <Menu.Item onClick={handleToggle}>
                        {draggable ? "Сохранить порядок" : "Изменить порядок"}
                    </Menu.Item>
                </Menu>}
            </Group>
        </Paper>
        <Paper shadow={'lg'} p={'sm'}>
            <Group spacing={0} direction={"column"}>
                <Title order={3}>
                    {courseQuery?.data?.title}
                </Title>
                <Text size={"lg"} sx={{textAlign: "justify"}}>
                    {courseQuery?.data?.description}
                </Text>
            </Group>
        </Paper>
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
            <SortableContext
                items={stages}
                strategy={verticalListSortingStrategy}
            >
                {stages.map((stage) =>
                    <Stage key={stage.id} stage={stage} draggable={draggable}
                           isAdmin={userQuery.isSuccess && userQuery.data.role === "ADMIN"}/>
                )}
            </SortableContext>
        </DndContext>
    </>
}

CoursePage.haveLayout = true