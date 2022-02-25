import {Layout} from "@components/Layout";
import {useRouter} from "next/router";
import Link from "next/link";
import {Material} from "@components/Material";
import useCourse from "../../../hooks/useCourse";
export default function CoursePage() {
    const router = useRouter()
    const {courseId} = router.query

    const {course: courseData, isLoading, isError} = useCourse(courseId)
    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const handleDelete = () => {
        fetch("http://localhost:3000/api/courses/" + router.query.courseId, {
            method: "delete"
        }).catch(e => console.error(e))
        router.push("/courses")
    }
    return <Layout>
        <div className="w-full">
            <h2>Страница курса</h2>
            <div className="flex md:space-x-4 md:items-center flex-col md:flex-row md:space-y-0 space-y-2">
                <Link href={`/courses/${router.query.courseId}/edit`}>
                    <button
                        className="bg-secondary text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-blue-600 hover:shadow-2xl transition ease-in">
                        Редактировать курс
                    </button>
                </Link>
                <Link href={`/courses/${router.query.courseId}/materials/create`}>
                    <button
                        className="bg-secondary text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-blue-600 hover:shadow-2xl transition ease-in">
                        Добавить материал курса
                    </button>
                </Link>
                <button onClick={handleDelete}
                        className="bg-red-700 text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-red-600 hover:shadow-2xl transition ease-in">
                    Удалить курс
                </button>
            </div>
            <h2>Название курса</h2>
            <p>{courseData.title}</p>
            <h2>Описание курса</h2>
            <p>{courseData.description}</p>
            <h2>Материалы курса</h2>
            {courseData.materials && courseData.materials.map((m, i) => <>
                <Material href={`/courses/${router.query.courseId}/materials/${m.id}`} index={i} title={m.title}
                          remove={undefined} edit={undefined}/>
            </>)}
        </div>
    </Layout>
}