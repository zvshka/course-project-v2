import {Layout} from "@components/Layout";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import parse from "html-react-parser";
import Prism from "../../../../../lib/prism";
import Link from "next/link";

export default function Material() {
    const router = useRouter()
    const [materialData, setMaterialData] = useState({})
    const contentRef = useRef(null)
    useEffect(() => {
        contentRef.current && Prism.highlightAllUnder(contentRef.current)
    }, [materialData])
    useEffect(() => {
        router.query.materialId && fetch("http://localhost:3000/api/materials/" + router.query.materialId)
            .then(res => res.json())
            .then(res => setMaterialData(res.material))
    }, [ router.query.materialId])

    const handleDelete = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/api/materials/" + router.query.materialId, {
            method: "delete"
        }).catch(console.error)
        router.push(`/courses/${router.query.courseId}/`)
    }

    return <Layout>
        <div className="w-full">
            <div className="flex md:space-x-4 flex-col md:flex-row mb-4 md:mb-0">
                <h1>{materialData.title}</h1>
                <div className="flex md:items-center md:space-x-4 md:space-y-0 space-y-2 flex-col md:flex-row">
                    <Link href={`/courses/${router.query.courseId}/materials/${router.query.materialId}/edit`}>
                        <button
                            className="bg-secondary text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-blue-600 hover:shadow-2xl transition ease-in">
                            Редактировать материал
                        </button>
                    </Link>
                    <button onClick={handleDelete}
                            className="bg-red-700 text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-red-600 hover:shadow-2xl transition ease-in">
                        Удалить материал
                    </button>
                </div>
            </div>
            <div className="space-y-6">
                <Link href={`/courses/${router.query.courseId}`}>
                    <a className="text-lg text-secondary my-4">
                        Назад к курсу...
                    </a>
                </Link>
                <div className="border border-gray-300 border-solid">
                    <div className="ck-content px-[0.6em]" ref={contentRef}>
                        {materialData.text && parse(materialData.text)}
                    </div>
                </div>
                <div className="flex justify-between">
                    <Link href={`/courses/${router.query.courseId}`}>
                        <a className="text-lg text-secondary">
                            Назад
                        </a>
                    </Link>
                    <Link href={`/courses/${router.query.courseId}`}>
                        <a className="text-lg text-secondary">
                            Дальше
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    </Layout>
}