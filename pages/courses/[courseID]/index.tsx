import {Layout} from "@components/Layout/Layout";
import {useRouter} from "next/router";
import Link from "next/link";
import useCourse from "../../../hooks/useCourse";
import useUser from "@hooks/useUser";

import {Badge, Box, Button, Card, createStyles, Group, Step, Stepper, Text, useMantineTheme} from '@mantine/core';
import {useListState, useToggle} from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {useEffect} from "react";

const useStyles = createStyles((theme) => ({
    item: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        borderRadius: theme.radius.md,
        border: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
        padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
        marginBottom: theme.spacing.sm,
    },

    itemDragging: {
        boxShadow: theme.shadows.sm,
    },

    symbol: {
        fontSize: 30,
        fontWeight: 700,
        width: 60,
    },
}));

interface DndListProps {
    data: {
        position: number;
        mass: number;
        symbol: string;
        name: string;
    }[];
}

export default function CoursePage() {
    const theme = useMantineTheme();
    const router = useRouter()
    const {courseId} = router.query
    const {classes, cx} = useStyles();
    const [draggable, toggleDrag] = useToggle(false, [true, false])
    const userData = useUser()
    const {course: courseData, isLoading, isError, isSuccess} = useCourse(courseId)
    const [state, handlers] = useListState([]);

    useEffect(() => {
        isSuccess && handlers.setState(courseData.materials)
    }, [isSuccess])

    const items = state.map((item:any, index) => (
        <Draggable key={item.id} index={index} draggableId={item.id} isDragDisabled={!draggable}>
            {(provided, snapshot) => (
                // eslint-disable-next-line react/jsx-no-undef
                <Link href={"/courses/" + router.query.courseId + "/materials/" + item.id}>
                    <Card
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        shadow="sm" p="lg"
                        component={"a"}
                    >
                        <Group position="apart" style={{ marginBottom: 5}}>
                            <Text size={"xl"} weight={500}>{item.title}</Text>
                        </Group>

                        <Text size="sm" style={{lineHeight: 1.5 }}>
                            {item.description || "Simple description"}
                        </Text>
                    </Card>
                </Link>
            )}
        </Draggable>
    ));

    const handleDelete = () => {
        fetch("http://localhost:3000/api/courses/" + router.query.courseId, {
            method: "delete"
        }).catch(e => console.error(e))
        router.push("/courses")
    }

    return <Layout>
        <div className="w-full">
            <h2>Страница курса</h2>
            {isLoading && <div>loading...</div>}
            {isSuccess && <>
                {userData.isSuccess && userData.user.role === "ADMIN" &&
                    <div className="flex md:space-x-4 md:items-center flex-col md:flex-row md:space-y-0 space-y-2">
                        <Link href={`/courses/${router.query.courseId}/edit`}>
                            <button
                                className="bg-secondary text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-blue-600 hover:shadow-2xl transition ease-in">
                                Редактировать курс
                            </button>
                        </Link>
                        <Link href={`/courses/${router.query.courseId}/materials/create`}>
                            <button
                                className="bg-secondary text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-blue-600 hover:shadow-2xl transition ease-in">
                                Добавить материал курса
                            </button>
                        </Link>
                        <button onClick={handleDelete}
                                className="bg-red-700 text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-red-600 hover:shadow-2xl transition ease-in">
                            Удалить курс
                        </button>
                    </div>}
                <h2>Название курса</h2>
                <p>{courseData.title}</p>
                <h2>Описание курса</h2>
                <p>{courseData.description}</p>
                <h2>Материалы курса</h2>
                <DragDropContext
                    onDragEnd={({ destination, source }) =>
                        handlers.reorder({ from: source.index, to: destination.index })
                    }
                >
                    <Droppable droppableId="dnd-list" direction="vertical">
                        {(provided) => (
                            <Group direction="column" grow {...provided.droppableProps} ref={provided.innerRef}>
                                {items}
                                {provided.placeholder}
                            </Group>
                        )}
                    </Droppable>
                </DragDropContext>
            </>}
        </div>
    </Layout>
}