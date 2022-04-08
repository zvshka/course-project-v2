import {Collapse, createStyles, Group, Menu, SimpleGrid, Text, Box} from "@mantine/core";
import {useState} from "react";
import { useFocusTrap } from '@mantine/hooks';
import {Lesson} from "@components/Content/Lesson";

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
        color: theme.black
    },
    content: {
        paddingLeft: theme.spacing.xl,
        // paddingBottom: theme.spacing.lg,
        lineHeight: 1.6,
        color: theme.black,
    },
}))

export const Stage = ({stage}) => {
    const {classes, cx} = useStyles()
    const [opened, setOpened] = useState(false)
    const buttonFocusRef = useFocusTrap()
    return <Box className={classes.accordionItem} onClick={(e) => setOpened(!opened)}>
        <Group position={"apart"} className={classes.control}>
            <Text>{stage.title}</Text>
            <Menu sx={{zIndex: 5}} ref={buttonFocusRef}>
                <Menu.Label>Application</Menu.Label>
            </Menu>
        </Group>
        <Collapse in={opened} className={classes.content} transitionDuration={300}>
            <SimpleGrid cols={4}>
                {stage.lessons.map((lesson, index) => <Lesson lesson={lesson} key={lesson.id}/>)}
            </SimpleGrid>
        </Collapse>
    </Box>
}