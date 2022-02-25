import {Layout} from "@components/Layout";
import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import Prism from "@lib/prism"
import parse from "html-react-parser";
import dynamic from "next/dynamic";
import Link from "next/link";

interface materialData {
    text: string
    title: string
}

const Editor = dynamic(() => import("@components/Editor"), {ssr: false})
export default function Material() {
    const router = useRouter()
    const [materialData, setMaterialData] = useState<materialData>({text: "", title: ""})
    const [materialTitle, setMaterialTitle] = useState("")
    const [materialText, setMaterialText] = useState("")

    useEffect(() => {
        router.query.materialId && fetch("http://localhost:3000/api/materials/" + router.query.materialId)
            .then(res => res.json())
            .then(res => setMaterialData(res.material))
    }, [router.query.materialId])

    useEffect(() => {
        materialData.text && setMaterialText(materialData.text)
        materialData.title && setMaterialTitle(materialData.title)
    }, [materialData.text, materialData.title])

    const contentRef = useRef(null)
    useEffect(() => {
        contentRef.current && Prism.highlightAllUnder(contentRef.current)
    }, [materialData])

    const saveMaterial = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/api/materials/" + router.query.materialId, {
            method: "put",
            body: JSON.stringify({
                title: materialTitle,
                text: materialText
            })
        }).catch(console.error)
    }

    return <Layout>
        <div className="w-full">
            <h2>Редактирование материалов курса</h2>
            <div className="space-y-2">
                <div className="flex space-x-4">
                    <Link href={"/courses/" + router.query.courseId}>
                        <button
                            className="bg-secondary text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-blue-600 hover:shadow-2xl transition ease-in">
                            Назад к курсу
                        </button>
                    </Link>
                    <button onClick={saveMaterial}
                            className="bg-secondary text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-blue-600 hover:shadow-2xl transition ease-in">
                        Сохранить
                    </button>
                </div>
                <input placeholder="Заголовок"
                       value={materialTitle}
                       onChange={(e) => setMaterialTitle(e.target.value)}
                       className="text-black placeholder-gray-600 w-full px-4 py-2.5 text-base outline-gray-400
                               transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200"/>
                <Editor data={materialText} setData={setMaterialText}/>
            </div>
            <h2>Предпросмотр контента</h2>
            <div className="border border-gray-300 border-solid">
                <div className="ck-content px-[0.6em]" ref={contentRef}>
                    {materialText && parse(materialText)}
                </div>
            </div>
        </div>
    </Layout>
}