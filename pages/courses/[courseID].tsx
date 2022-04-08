import {Shell} from "@components/Layout/Shell";
import {Button, Group, Title} from "@mantine/core";
import useCourse from "@hooks/useCourse";
import {useRouter} from "next/router";
import {useModals} from "@mantine/modals";
import StageCreationForm from "@components/Content/Forms/StageCreationForm";
import {Stage} from "@components/Content/Stage";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {useListState, useToggle} from "@mantine/hooks";

export default function CoursePage() {
    const router = useRouter()
    const modals = useModals()
    const courseQuery = useCourse(router.query.courseID)
    const [draggable, toggleDraging] = useToggle(false, [true, false])

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
                <Button onClick={() => toggleDraging()}>
                    Изменить порядок
                </Button>
            </Group>
        </Group>
        <DragDropContext
            onDragEnd={({ destination, source }) =>
                console.log(destination, source)
            }
        >
            <Droppable droppableId="dnd-list" direction="vertical">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {courseQuery.data && courseQuery.data.stages.map((stage, index) => (
                            <Stage key={stage.id} stage={stage} draggable={draggable}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </Shell>
}