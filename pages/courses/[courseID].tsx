import {Shell} from "@components/Layout/Shell";
import {Button, Group, Title} from "@mantine/core";
import useCourse from "@hooks/useCourse";
import {useRouter} from "next/router";
import {useModals} from "@mantine/modals";
import StageCreationForm from "@components/Content/Forms/StageCreationForm";
import {useListState, useToggle} from "@mantine/hooks";
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";


const Stages = dynamic(import('@components/Layout/Stages'), {
    ssr: false
})

export default function CoursePage() {
    const router = useRouter()
    const modals = useModals()
    const courseQuery = useCourse(router.query.courseID)
    const [draggable, toggleDragging] = useToggle(false, [true, false])
    const [stages, stagesHandlers] = useListState([])

    useEffect(() => {
        courseQuery.isSuccess && stagesHandlers.setState(courseQuery.data.stages)
    }, [courseQuery.isLoading, courseQuery.isSuccess])

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
            <Group>
                <Button onClick={openCreatingModal}>
                    Создать этап
                </Button>
                <Button onClick={() => toggleDragging()}>
                    Изменить порядок
                </Button>
            </Group>
        </Group>
        <Stages stages={stages} stagesHandlers={stagesHandlers} draggable={draggable}/>
    </Shell>
}