import {Box, Collapse, createStyles, Group, Menu, SimpleGrid, Text, Title} from "@mantine/core";
import {Lesson} from "@components/Content/Lesson";
import {GripVertical, Trash} from "tabler-icons-react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useModals} from "@mantine/modals";
import {useNotifications} from "@mantine/notifications";
import {CheckIcon} from "@modulz/radix-icons";
import {useQueryClient} from "react-query";
import {LessonCreationDrawer} from "@components/Content/Forms/LessonCreationDrawer";
import {useToggle} from "@mantine/hooks";
import {fetcher} from "@lib/fetcher";

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
        paddingTop: '3px',
        paddingBottom: '3px',
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        '&:hover': {
            backgroundColor: theme.colors.gray[2]
        }
    },
}))

export const Stage = ({stage, draggable, isAdmin = false}) => {
    const {classes} = useStyles()
    const modals = useModals()
    const notifications = useNotifications()
    const queryClient = useQueryClient()
    const [collapse, toggleCollapse] = useToggle(false, [true, false])
    const [drawer, toggleDrawer] = useToggle(false, [true, false])
    const openConfirmModal = () => modals.openConfirmModal({
        title: 'Пожалуйста, подтвердите удаление',
        children: (
            <Text size="sm">
                Данное действие нельзя отменить, продолжить?
            </Text>
        ),
        labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
        onCancel: () => console.log('Cancel'),
        onConfirm: () => {
            fetcher('/api/stages/' + stage.id, {
                method: "DELETE",
                auth: true
            }).then(res => {
                notifications.showNotification({
                    title: "Успех",
                    message: res.data.message,
                    color: "green",
                    icon: <CheckIcon/>
                })
                queryClient.invalidateQueries(['course', stage.courseId])
            }).catch(e => {
                notifications.showNotification({
                    title: "Ошибка",
                    message: "При удалении этапа произошла ошибка",
                    color: "red"
                })
            })
        },
    });

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: stage.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleDelete = (e) => {
        e.preventDefault()
        openConfirmModal()
    }

    return <>
        <LessonCreationDrawer stage={stage} opened={drawer} setOpened={toggleDrawer}/>
        <Box ref={setNodeRef}
             style={style}
             {...attributes}
             className={classes.item}
             onClick={(e) => toggleCollapse()}>
            <Group position={"apart"} className={classes.control}>
                <Group>
                    {draggable && <div {...listeners} className={classes.dragHandle}>
                        <GripVertical size={18}/>
                    </div>}
                    <Title order={4}>{stage.title}</Title>
                </Group>
                {isAdmin && <>
                    <Menu onClick={(e) => e.stopPropagation()}>
                        <Menu.Item>Изменить этап</Menu.Item>
                        <Menu.Item onClick={(e) => {
                            e.stopPropagation();
                            toggleDrawer()
                        }}>
                            Создать урок
                        </Menu.Item>
                        <Menu.Label>Опасное</Menu.Label>
                        <Menu.Item onClick={handleDelete} color={'red'} icon={<Trash size={14}/>}>Удалить</Menu.Item>
                    </Menu>
                </>}
            </Group>
            <Collapse in={collapse} transitionDuration={300}>
                <Box className={classes.contentInner}>
                    <SimpleGrid cols={4}>
                        {stage.lessons.map((lesson, index) => <Lesson isAdmin={isAdmin} lesson={lesson}
                                                                      key={lesson.id}/>)}
                    </SimpleGrid>
                </Box>
            </Collapse>
        </Box>
    </>
}