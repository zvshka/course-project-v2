import {Box, createStyles, Group, Menu, Text} from "@mantine/core";
import Link from "next/link"
import {Pencil, TrashX} from "tabler-icons-react";
import {useModals} from "@mantine/modals";
import {fetcher} from "@lib/fetcher";
import {CheckIcon} from "@modulz/radix-icons";
import {useNotifications} from "@mantine/notifications";
import {useQueryClient} from "react-query";
import {useRouter} from "next/router";

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
    const router = useRouter()
    const modals = useModals()
    const notifications = useNotifications()
    const queryClient = useQueryClient()
    const openDeletionModal = () => modals.openConfirmModal({
        title: 'Пожалуйста, подтвердите удаление',
        children: (
            <Text size="sm">
                Данное действие нельзя отменить, продолжить?
            </Text>
        ),
        labels: {confirm: 'Подтвердить' , cancel: 'Отмена'},
        onCancel: () => console.log('Cancel'),
        onConfirm: () => {
            fetcher('/api/lessons/' + lesson.id, {
                method: "DELETE",
                auth: true
            }).then(res => {
                notifications.showNotification({
                    title: "Успех",
                    message: res.data.message,
                    color: "green",
                    icon: <CheckIcon/>
                })
                queryClient.invalidateQueries(['course', router.query.courseID])
            }).catch(e => {
                console.log(e)
                notifications.showNotification({
                    title: "Ошибка",
                    message: "При удалении урока произошла ошибка",
                    color: "red"
                })
            })
        },
    });

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
                        <Menu.Item onClick={openDeletionModal} icon={<TrashX size={14}/>} color={"red"}>Удалить</Menu.Item>
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