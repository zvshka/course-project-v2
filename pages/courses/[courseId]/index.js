import {Layout} from "../../../components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function CoursePage() {
    const router = useRouter()
    const [courseData, setCourseData] = useState({})
    useEffect(() => {
        router.query.courseId && fetch("http://localhost:3000/api/courses/" + router.query.courseId)
            .then(res => res.json())
            .then(res => setCourseData(res.course))

    }, [router.query.id])
    const handleDelete = () => {
        fetch("http://localhost:3000/api/courses/" + router.query.courseId, {
            method: "delete"
        }).catch(e => {})
        router.push("/courses")
    }
    return <Layout>
        <div className="w-full">
            <h2>Страница курса</h2>
            <div className="flex space-x-4 items-center">
                <>
                    <Link href={`/courses/${router.query.courseId}/edit`}>
                        <button className="bg-secondary text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-blue-600 hover:shadow-2xl transition ease-in">
                            Редактировать курс
                        </button>
                    </Link>
                </>
                <>
                    <button onClick={handleDelete} className="bg-red-700 text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-red-600 hover:shadow-2xl transition ease-in">
                        Удалить курс
                    </button>
                </>
            </div>
            <h2>Название курса</h2>
            <p>{courseData.title}</p>
            <h2>Описание курса</h2>
            <p>{courseData.description}</p>
            <h2>Материалы курса</h2>
        </div>
    </Layout>
}