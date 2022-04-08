import {Collapse, createStyles, Group, Menu, SimpleGrid, Text, Box} from "@mantine/core";
import {useState} from "react";
import {Lesson} from "@components/Content/Lesson";
import {Draggable} from "react-beautiful-dnd";
import {GripVertical} from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
    item: {
        marginTop: theme.spacing.xl,
        backgroundColor: theme.white,
        borderBottom: 0,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.lg,
    },
    control: {
        fontSize: theme.fontSizes.lg,
        padding: `${theme.spacing.lg}px ${theme.spacing.md}px`,
        color: theme.black
    },
    content: {
        paddingLeft: theme.spacing.xl,
        lineHeight: 1.6,
        color: theme.black,
    },
    contentInner: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },
    dragHandle: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    },
}))

export const Stage = ({stage, draggable}) => {
    const {classes, cx} = useStyles()
    const [opened, setOpened] = useState(false)
    return <Draggable draggableId={stage.id} index={stage.position} isDragDisabled={!draggable}>
        {(provided, snapshot) => (
            <Box ref={provided.innerRef}
                 {...provided.draggableProps}
                 className={classes.item}
                 onClick={(e) => setOpened(!opened)}>
                <Group position={"apart"} className={classes.control}>
                    <Group>
                        {draggable && <div {...provided.dragHandleProps} className={classes.dragHandle}>
                            <GripVertical size={18}/>
                        </div>}
                        <Text>{stage.title}</Text>
                    </Group>
                    <Menu onClick={(e) => e.stopPropagation()}>
                        <Menu.Label>Application</Menu.Label>
                    </Menu>
                </Group>
                <Collapse in={opened} transitionDuration={300}>
                    <Box className={classes.contentInner}>
                        <SimpleGrid cols={4}>
                            {stage.lessons.map((lesson, index) => <Lesson lesson={lesson} key={lesson.id}/>)}
                        </SimpleGrid>
                    </Box>
                </Collapse>
            </Box>
        )}
    </Draggable>
}