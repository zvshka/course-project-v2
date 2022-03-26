import {Layout} from "@components/Layout";
import Link from "next/link";
import {useQueryClient} from "react-query";
import useUser from "@hooks/useUser";
import useCourses from "@hooks/useCourses";
import {Button, Title} from "@mantine/core";
import {useNotifications} from "@mantine/notifications";
import {useEffect} from "react";
import {Shell} from "@components/Shell";
export default function Courses() {
    // Access the client
    const queryClient = useQueryClient()
    const notifications = useNotifications()
    // Queries
    const userData = useUser()

    const {courses, isSuccess, isError} = useCourses()

    useEffect(() => {
        isError && notifications.showNotification({
            title: "Произошла ошибка",
            message: "Не удалось загрузить курсы",
            color: "red"
        })
    }, [isError])

    return <Shell>
        <Title order={2}>
            Курсы
        </Title>
    </Shell>
}