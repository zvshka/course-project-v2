import React from 'react';
import {Badge, Card, createStyles, Group, Image, Menu, Text} from '@mantine/core';
import Link from "next/link";
import {Pencil, TrashX} from "tabler-icons-react";
import {CheckIcon} from "@modulz/radix-icons";
import {useModals} from "@mantine/modals";
import {useNotifications} from "@mantine/notifications";
import {useQueryClient} from "react-query";
import axios from "axios";
import {CourseCreationForm} from "@components/Content/Forms/CourseCreationForm";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    section: {
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    like: {
        color: theme.colors.red[6],
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
    buttons: {
        // ref: getRef('buttons'),
        // visibility: "hidden",
        position: "absolute",
        top: theme.spacing.sm, right: theme.spacing.sm,
        zIndex: 5,
    },
}));

export function Course({course, isAdmin = false}) {
    // console.log(course)
    const {classes} = useStyles();
    const modals = useModals()
    const notifications = useNotifications()
    const queryClient = useQueryClient()

    const features = course.badges.map((badge) => (
        <Badge color={"blue"} key={badge.label}>
            {badge.label}
        </Badge>
    ));

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
            axios.delete('/api/courses/' + course.id).then(res => {
                notifications.showNotification({
                    title: "Успех",
                    message: res.data.message,
                    color: "green",
                    icon: <CheckIcon/>
                })
                queryClient.invalidateQueries("infinite_courses")
            }).catch(e => {
                notifications.showNotification({
                    title: "Ошибка",
                    message: "При удалении этапа произошла ошибка",
                    color: "red"
                })
            })
        },
    });

    const handleEdit = (e) => {
        e.preventDefault()
        modals.openModal({
            title: "Изменение курса",
            children: <>
                <CourseCreationForm course={course}/>
            </>
        })
    }


    const handleDelete = (e) => {
        e.preventDefault()
        openConfirmModal()
    }

    return <Link href={`/courses/${course.id}`} passHref>
        <Card component={'a'} withBorder radius="md" p="md" className={classes.card}>
            <Card.Section sx={{position: "relative"}}>
                <Group className={classes.buttons}>
                    {isAdmin && <Menu
                        onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}>
                        <Menu.Item onClick={handleEdit}
                                   icon={<Pencil size={14}/>}>Изменить</Menu.Item>
                        <Menu.Item icon={<TrashX size={14}/>}
                                   color={"red"}
                                   onClick={handleDelete}>
                            Удалить
                        </Menu.Item>
                    </Menu>}
                </Group>
                <Image src={course.iconURL ? course.iconURL + '?width=300' : ""} withPlaceholder alt={course?.title}
                       height={180}/>
            </Card.Section>
            <Card.Section className={classes.section} mt="md">
                <Text size="lg" weight={500}>
                    {course?.title || "Just a title"}
                </Text>
                <Text size="sm" mt="xs">
                    {course?.description || "Small description for skeleton of course"}
                </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} color="dimmed">
                    Категории
                </Text>
                <Group spacing={7} mt={5}>
                    {features}
                </Group>
            </Card.Section>
        </Card>
    </Link>
}