import {Box, createStyles, Group, Menu, Text} from "@mantine/core";
import Link from "next/link"
import {Pencil, TrashX} from "tabler-icons-react";

const useStyles = createStyles((theme, _, getRef) => ({
    box: {
        position: "relative",
        width: "100%",
        backgroundColor: theme.colors.gray[1],
        borderRadius: theme.radius.md,
        '&:before': {
            content: `''`,
            display: "block",
            paddingTop: "50%"
        }
    },
    boxContent: {
        position: 'absolute',
        padding: theme.spacing.sm,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        height: '100%',
        '&:hover': {
            [`& .${getRef('buttons')}`]: {
                visibility: "visible"
            }
        }
    },

    buttons: {
        ref: getRef('buttons'),
        visibility: "hidden",
        position: "absolute",
        top: theme.spacing.sm, right: theme.spacing.sm,
    },
}))

export function Lesson({lesson, isAdmin}) {
    const {classes, theme} = useStyles();
    return <Box className={classes.box}>
        <Link href={`/lessons/${lesson.id}`} passHref>
            <Box className={classes.boxContent} component={'a'}>
                <Group className={classes.buttons}>
                    {isAdmin && <Menu onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}>
                        <Menu.Item icon={<Pencil size={14}/>}>Изменить</Menu.Item>
                        <Menu.Item icon={<TrashX size={14}/>} color={"red"}>Удалить</Menu.Item>
                    </Menu>}
                </Group>
                <Text sx={{fontWeight: 600}}>
                    {lesson.title}
                </Text>
                <Text sx={{color: theme.colors.gray[7], fontSize: theme.fontSizes.sm}}>
                    {lesson.description}
                </Text>
            </Box>
        </Link>
    </Box>
}