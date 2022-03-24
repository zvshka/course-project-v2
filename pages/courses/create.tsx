import dynamic from "next/dynamic";
import {useState} from "react";
import {Layout} from "@components/Layout";

const Editor = dynamic(() => import("@components/Editor"), {ssr: false})
export default function Create() {
    const [courseTitle, setCourseTitle] = useState("")
    const [courseDescription, setCourseDescription] = useState("")
    const saveCourse = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/api/courses", {
            method: "post",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                title: courseTitle,
                description: courseDescription
            })
        }).then((res) => res.json()).then(res => {
            console.error(res)
            setCourseTitle("")
            setCourseDescription("")
        }).catch(e => console.error(e))
    }

    return (
        <Layout>
            <div className="w-full">
                <h2>Создание курса</h2>
                <div className="space-y-2">
                    <input placeholder="Заголовок"
                           value={courseTitle}
                           onChange={(e) => setCourseTitle(e.target.value)}
                           className="text-black placeholder-gray-600 w-full px-4 py-2.5 text-base outline-gray-400
                               transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200"/>
                    <input placeholder="Описание"
                           value={courseDescription}
                           onChange={(e) => setCourseDescription(e.target.value)}
                           className="text-black placeholder-gray-600 w-full px-4 py-2.5 text-base outline-gray-400
                                transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200"/>
                </div>
                <hr/>
                <button onClick={saveCourse} className="bg-secondary text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-blue-600 hover:shadow-2xl transition ease-in">
                    Сохранить
                </button>
            </div>
        </Layout>
    )
}
