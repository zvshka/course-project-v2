import {Shell} from "@components/Layout/Shell";
import {Box, createStyles, SimpleGrid, Title} from "@mantine/core";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Stage} from "@components/Content/Stage";
import Link from "next/link";
import React, {useEffect} from "react";
import {GripVertical} from "tabler-icons-react";
import {useListState} from "@mantine/hooks";

const randomChars = (length) => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            characters.length));
    }
    return result;
}


const useStyles = createStyles((theme) => ({
    box: {
        position: "relative",
        width: "100%",
        textAlign: "center",
        backgroundColor: theme.colors.gray[4],
        borderRadius: theme.radius.md,
        '&:before': {
            content: `''`,
            display: "block",
            paddingTop: "100%"
        }
    },
    boxContent: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: '100%'
    },
    dragHandle: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },
}))

const Skeleton = ({index, id}) => {
    const {classes} = useStyles()
    return <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
            <Box className={classes.box}
                {...provided.draggableProps}
                 ref={provided.innerRef}>
                <Box className={classes.boxContent}>
                    <div {...provided.dragHandleProps} className={classes.dragHandle}>
                        <GripVertical size={18} />
                    </div>
                    {id}
                </Box>
            </Box>
        )}
    </Draggable>
}

export default function Home() {
    const [state, handlers] = useListState([])
    useEffect(() => {
        handlers.setState([...Array(6)].map((e, i) => ({id: randomChars(5)})))
    }, [])
    return (
        <Shell>
            <Title order={2}>
                Главная
            </Title>
            <DragDropContext onDragEnd={({destination, source}) => {
                handlers.reorder({from: source.index, to: destination.index})
                console.table(state)
            }}>
                <Droppable droppableId="dnd-list" direction="horizontal">
                    {(provided) => (
                        <SimpleGrid cols={4} {...provided.droppableProps} ref={provided.innerRef}>
                            {state.map((e, index) => <Skeleton id={`item_${e.id}`} key={e.id} index={index}/>)}
                            {provided.placeholder}
                        </SimpleGrid>
                    )}
                </Droppable>
            </DragDropContext>
        </Shell>
    )
}
