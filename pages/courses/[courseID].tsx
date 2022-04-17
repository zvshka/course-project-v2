import {Shell} from "@components/Layout/Shell";
import {Button, Group, Title} from "@mantine/core";
import useCourse from "@hooks/useCourse";
import {useRouter} from "next/router";
import {useModals} from "@mantine/modals";
import StageCreationForm from "@components/Content/Forms/StageCreationForm";
import {useListState, useToggle} from "@mantine/hooks";
import {useEffect} from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import {CheckIcon} from "@modulz/radix-icons";
import {useNotifications} from "@mantine/notifications";
import {useQueryClient} from "react-query";
import useUser from "@hooks/useUser";


const Stages = dynamic(import('@components/Layout/Stages'), {
    ssr: false
})

export default function CoursePage() {
    const userQuery = useUser()
    const router = useRouter()
    const modals = useModals()
    const notifications = useNotifications()
    const queryClient = useQueryClient()
    const courseQuery = useCourse(router.query.courseID)
    const [draggable, toggleDragging] = useToggle(false, [true, false])
    const [stages, stagesHandlers] = useListState([])

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

    useEffect(() => {
        courseQuery.isSuccess && stagesHandlers.setState(courseQuery.data.stages)
    }, [courseQuery?.data?.stages, courseQuery.isSuccess])

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
            {userQuery.isSuccess && userQuery.data.role === "ADMIN" && <Group>
                <Button onClick={openCreatingModal}>
                    Создать этап
                </Button>
                <Button onClick={handleToggle}>
                    Изменить порядок
                </Button>
            </Group>}
        </Group>
        <Stages stages={stages} stagesHandlers={stagesHandlers} draggable={draggable}/>
    </Shell>
}