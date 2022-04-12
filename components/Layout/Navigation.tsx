import {Anchor, Breadcrumbs, Text} from "@mantine/core";
import {useRouter} from "next/router";
import useCourse from "@hooks/useCourse";
import useLesson from "@hooks/useLesson";
import Link from "next/link"

export const Navigation = () => {
    const router = useRouter()
    const courseID = router.query.courseID
    const lessonID = router.query.lessonID

    const courseQuery = useCourse(courseID)
    const lessonQuery = useLesson(lessonID)
    return <Breadcrumbs>

    </Breadcrumbs>
}