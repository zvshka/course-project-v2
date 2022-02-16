import {Layout} from "@components/Layout";
import {Course} from "@components/Course";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function Courses() {
    const [courses, setCourses] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/api/courses")
            .then(res => res.json())
            .then(res => setCourses(res.courses))
    }, [])
    return <Layout>
        <div className="w-full">
            <h2>Доступные курсы</h2>
            <div className="flex flex-col space-y-4">
                <Link href={"/courses/create"}>
                    <button className="bg-secondary text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-blue-600 hover:shadow-2xl transition ease-in">
                        Создать курс
                    </button>
                </Link>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {courses.length > 0 && courses.map((c, i) => <Course key={i} course={c} progress={true}/>)}
                </div>
            </div>
        </div>
    </Layout>
}