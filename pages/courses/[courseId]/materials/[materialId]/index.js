import {Layout} from "@components/Layout";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import parse from "html-react-parser";
import Prism from "../../../../../lib/prism";

export default function Material() {
    const router = useRouter()
    const [materialData, setMaterialData] = useState({})
    useEffect(() => {
        router.query.materialId && fetch("http://localhost:3000/api/materials/" + router.query.materialId)
            .then(res => res.json())
            .then(res => setMaterialData(res.material))
    }, [ router.query.materialId])
    const contentRef = useRef(null)
    useEffect(() => {
        contentRef.current && Prism.highlightAllUnder(contentRef.current)
    }, [materialData])
    return <Layout>
        <div className="w-full">
            <h2>{materialData.title}</h2>
            <div className="border border-gray-300 border-solid">
                <div className="ck-content px-[0.6em]" ref={contentRef}>
                    {materialData.text && parse(materialData.text)}
                </div>
            </div>
        </div>
    </Layout>
}