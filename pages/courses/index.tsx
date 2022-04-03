import useUser from "@hooks/useUser";
import useCourses from "@hooks/useCourses";
import {Button, Group, SimpleGrid, Title} from "@mantine/core";
import {useNotifications} from "@mantine/notifications";
import {useEffect} from "react";
import {Shell} from "@components/Layout/Shell";
import {useModals} from "@mantine/modals";
import {CourseCreationForm} from "@components/Content/CourseCreationForm";
import {Course} from "@components/Content/Course";

export default function Courses() {
    const notifications = useNotifications()
    const modals = useModals()
    const userData = useUser()
    const {courses, isSuccess, isError} = useCourses()

    const openCreatingModal = () => {
        const id = modals.openModal({
            title: "Создание курса",
            children: <>
                <CourseCreationForm/>
            </>
        })
    }

    useEffect(() => {
        isError && notifications.showNotification({
            title: "Произошла ошибка",
            message: "Не удалось загрузить курсы",
            color: "red"
        })
    }, [isError])

    return <Shell>
        <Group position={"apart"}>
            <Title order={2}>
                Курсы
            </Title>
            {userData.isSuccess && userData.user.role === "ADMIN" && <Button onClick={openCreatingModal}>
                Создать курс
            </Button>}
        </Group>
        <SimpleGrid cols={2} mt={"md"} breakpoints={[{minWidth: 'md', cols: 4}]}>
            {isSuccess && courses.map((c, i) => (
                <Course key={i} course={c}>
                    {c.title}
                </Course>
            ))}
        </SimpleGrid>
    </Shell>
}