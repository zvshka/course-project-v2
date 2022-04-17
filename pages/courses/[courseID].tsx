import {Shell} from "@components/Layout/Shell";
import {Button, Group, Paper, Title} from "@mantine/core";
import useCourse from "@hooks/useCourse";
import {useRouter} from "next/router";
import {useModals} from "@mantine/modals";
import StageCreationForm from "@components/Content/Forms/StageCreationForm";
import {useListState, useToggle} from "@mantine/hooks";
import {useEffect} from "react";
import axios from "axios";
import {CheckIcon} from "@modulz/radix-icons";
import {useNotifications} from "@mantine/notifications";
import {useQueryClient} from "react-query";
import useUser from "@hooks/useUser";
import {closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {Stage} from "@components/Content/Stage";

export default function CoursePage() {
    const userQuery = useUser()
    const router = useRouter()
    const modals = useModals()
    const notifications = useNotifications()
    const queryClient = useQueryClient()
    const [draggable, toggleDragging] = useToggle(false, [true, false])

    const courseQuery = useCourse(router.query.courseID)
    const [stages, stagesHandlers] = useListState([])

    useEffect(() => {
        courseQuery.isSuccess && stagesHandlers.setState(courseQuery.data.stages)
    }, [courseQuery?.data?.stages, courseQuery.isSuccess])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
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

    const handleToggle = (e) => {
        toggleDragging()
        if (!draggable) return
        const toUpdate = stages.map((stage, index) => ({id: stage.id, position: index + 1}))
        axios.patch('/api/stages', toUpdate, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        }).then(res => {
            notifications.showNotification({
                title: "Успех",
                message: res.data.message,
                color: "green",
                icon: <CheckIcon/>
            })
            queryClient.invalidateQueries(['course', router.query.courseID])
        }).catch(e => {
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
            children: <>
                <StageCreationForm courseId={router.query.courseID}/>
            </>
        })
    }

    return <Shell>
        <Paper shadow={'lg'} px={'sm'} py={'sm'}>
            <Group position={"apart"}>
                <Title order={3}>
                    Страница курса
                </Title>
                {userQuery.isSuccess && userQuery.data.role === "ADMIN" && <Group>
                    <Button onClick={openCreatingModal}>
                        Создать этап
                    </Button>
                    <Button onClick={handleToggle}>
                        Изменить порядок
                    </Button>
                </Group>}
            </Group>
        </Paper>
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
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
    </Shell>
}