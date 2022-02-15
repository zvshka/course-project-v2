import dynamic from "next/dynamic";
import parse from "html-react-parser"
import {useEffect, useRef, useState} from "react";
import Prism from "prismjs"
import {Layout} from "../../components/Layout";

const Editor = dynamic(() => import("../../components/Editor"), {ssr: false})
export default function Create() {
    const [courseTitle, setCourseTitle] = useState("")
    const [courseDescription, setCourseDescription] = useState("")
    //
    // const [courseMaterials, setCourseMaterials] = useState({})
    //
    // const [materialTitle, setMaterialTitle] = useState("")
    // const [materialText, setMaterialText] = useState("<p>Click here and start typing!</p>")
    // const [editingMaterial, setEditingMaterial] = useState("")
    // const contentRef = useRef(null)
    // useEffect(() => {
    //     Prism.highlightAllUnder(contentRef.current)
    // }, [materialText])

    // const addMaterial = () => {
    //     let updatedMaterials = courseMaterials
    //     if (editingMaterial.length === 0) {
    //         updatedMaterials[materialTitle] = materialText
    //         setCourseMaterials(updatedMaterials)
    //     } else {
    //         console.log(materialTitle !== editingMaterial)
    //         if (materialTitle !== editingMaterial) {
    //             const {[editingMaterial]: val, ...newMaterials} = courseMaterials
    //             updatedMaterials = newMaterials
    //             updatedMaterials[materialTitle] = materialText
    //         } else {
    //             updatedMaterials[editingMaterial] = materialText
    //         }
    //         setEditingMaterial("")
    //         setCourseMaterials(updatedMaterials)
    //     }
    //     setMaterialTitle("")
    //     setMaterialText("<p>Click here and start typing!</p>")
    // }
    //
    // const removeMaterial = (material) => {
    //     const {[material]: val, ...newMaterials} = courseMaterials
    //     setCourseMaterials(newMaterials)
    // }
    //
    // const editMaterial = (material) => {
    //     setEditingMaterial(material)
    //     setMaterialTitle(material)
    //     setMaterialText(courseMaterials[material])
    // }
    //
    const saveCourse = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/api/courses", {
            method: "post",
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
                {/*<h3>Добавление материалов курса</h3>*/}
                {/*<div className="space-y-2">*/}
                {/*    <div className="flex space-x-2">*/}
                {/*        <button onClick={addMaterial}*/}
                {/*                className="bg-secondary text-white rounded-lg border-0 outline-0 px-4 py-2 text-lg">*/}
                {/*            Сохранить этап*/}
                {/*        </button>*/}
                {/*        {editingMaterial.length > 0 && <h4>Режим редактирования для: {editingMaterial}</h4>}*/}
                {/*    </div>*/}
                {/*    <input placeholder="Заголовок этапа"*/}
                {/*           value={materialTitle}*/}
                {/*           onChange={(e) => setMaterialTitle(e.target.value)}*/}
                {/*           className="text-black placeholder-gray-600 w-full px-4 py-2.5 text-base*/}
                {/*               transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200*/}
                {/*               ring-offset-current ring-offset-2 ring-gray-400"/>*/}
                {/*    <h4>Контент</h4>*/}
                {/*    <Editor data={materialText} setData={setMaterialText}/>*/}
                {/*</div>*/}
                {/*<h3>Предпросмотр контента этапа</h3>*/}
                {/*{Object*/}
                {/*    .entries(courseMaterials)*/}
                {/*    .map(([k, v], i) => <Material key={i} materialTitle={k}*/}
                {/*                                  index={i} del={() => removeMaterial(k)}*/}
                {/*                                  edit={() => editMaterial(k)}/>)}*/}
                {/*<div className="border border-gray-300 border-solid">*/}
                {/*    <div className="ck-content px-2" ref={contentRef}>*/}
                {/*        {parse(materialText)}*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </Layout>
    )
}
