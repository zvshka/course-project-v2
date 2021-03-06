import {Box, Collapse, createStyles, Group, Menu, SimpleGrid, Text, Title} from "@mantine/core";
import {Lesson} from "@components/Content/Lesson";
import {GripVertical, Trash} from "tabler-icons-react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useModals} from "@mantine/modals";
import {useNotifications} from "@mantine/notifications";
import {CheckIcon} from "@modulz/radix-icons";
import {useQueryClient} from "react-query";
import {useToggle} from "@mantine/hooks";
import StageCreationForm from "@components/Content/Forms/StageCreationForm";
import Link from "next/link";
import axios from "axios";

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
    const openConfirmModal = () => modals.openConfirmModal({
        title: '????????????????????, ?????????????????????? ????????????????',
        children: (
            <Text size="sm">
                ???????????? ???????????????? ???????????? ????????????????, ?????????????????????
            </Text>
        ),
        labels: {confirm: '??????????????????????', cancel: '????????????'},
        onCancel: () => console.log('Cancel'),
        onConfirm: () => {
            axios.delete('/api/stages/' + stage.id).then(res => {
                notifications.showNotification({
                    title: "??????????",
                    message: res.data.message,
                    color: "green",
                    icon: <CheckIcon/>
                })
                queryClient.invalidateQueries(['course', stage.courseId]).catch(e => console.log(e))
            }).catch(e => {
                console.log(e)
                notifications.showNotification({
                    title: "????????????",
                    message: "?????? ???????????????? ?????????? ?????????????????? ????????????",
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
        <Box ref={setNodeRef}
             style={style}
             {...attributes}
             className={classes.item}
             onClick={() => toggleCollapse()}>
            <Group position={"apart"} className={classes.control}>
                <Group>
                    {draggable && <div {...listeners} className={classes.dragHandle}>
                        <GripVertical size={18}/>
                    </div>}
                    <Title order={4}>{stage.title}</Title>
                </Group>
                {isAdmin && <>
                    <Menu onClick={(e) => e.stopPropagation()}>
                        <Menu.Item onClick={(e) => {
                            e.stopPropagation()
                            modals.openModal({
                                title: "???????????????? ??????????",
                                children: <>
                                    <StageCreationForm courseId={stage.courseId} stage={stage}/>
                                </>
                            })
                        }}>???????????????? ????????</Menu.Item>
                        <Link href={"/lessons/create?courseId=" + stage.courseId + "&stageId=" + stage.id} passHref>
                            <Menu.Item component={'a'}>
                                ?????????????? ????????
                            </Menu.Item>
                        </Link>
                        <Menu.Label>??????????????</Menu.Label>
                        <Menu.Item onClick={handleDelete} color={'red'} icon={<Trash size={14}/>}>??????????????</Menu.Item>
                    </Menu>
                </>}
            </Group>
            <Collapse in={collapse} transitionDuration={300}>
                {!draggable && <Box className={classes.contentInner}>
                    <SimpleGrid breakpoints={[{
                        maxWidth: "sm",
                        cols: 1
                    }]} cols={5}>
                        {stage.lessons.map((lesson) =>
                            <Lesson isAdmin={isAdmin}
                                    lesson={lesson}
                                    key={lesson.id}/>)}
                    </SimpleGrid>
                </Box>}
            </Collapse>
        </Box>
    </>
}