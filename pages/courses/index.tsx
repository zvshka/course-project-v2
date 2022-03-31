import {useQueryClient} from "react-query";
import useUser from "@hooks/useUser";
import useCourses from "@hooks/useCourses";
import {Button, Container, SimpleGrid, Title} from "@mantine/core";
import {useNotifications} from "@mantine/notifications";
import {useEffect} from "react";
import {Shell} from "@components/Layout/Shell";
import {CourseCard} from "@components/Content/CourseCard";
export default function Courses() {
    const notifications = useNotifications()
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
        <SimpleGrid cols={3} mt={"1rem"}>
            <CourseCard link={""} image={"https://deadlylaugh.ru/group/id-111111163/photo/w/5dffa45fdb931e050b89894e830204fe.jpg"} title={"Основы JS"} author={"admin"} views={500} comments={500}/>
            <CourseCard link={""} image={"https://yt3.ggpht.com/a/AATXAJyg6EVZEB7Bs7ZJ_oaWCumiqSBXjYM64yi3pg=s900-c-k-c0xffffffff-no-rj-mo"} title={"Основы JS"} author={"admin"} views={500} comments={500}/>
            <CourseCard link={""} image={"https://avatars.mds.yandex.net/get-zen_doc/3413519/pub_5ff887b2fe4e686f6ae6ba3f_5ff887d7f906b16872a69755/scale_1200"} title={"Основы JS"} author={"admin"} views={500} comments={500}/>
            <CourseCard link={""} image={"https://avatars.mds.yandex.net/get-zen_doc/3413519/pub_5ff887b2fe4e686f6ae6ba3f_5ff887d7f906b16872a69755/scale_1200"} title={"Основы JS"} author={"admin"} views={500} comments={500}/>
            <CourseCard link={""} image={"https://avatars.mds.yandex.net/get-zen_doc/3413519/pub_5ff887b2fe4e686f6ae6ba3f_5ff887d7f906b16872a69755/scale_1200"} title={"Основы JS"} author={"admin"} views={500} comments={500}/>
        </SimpleGrid>
    </Shell>
}