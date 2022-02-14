import dynamic from "next/dynamic";
import parse from "html-react-parser"
import {useEffect, useRef, useState} from "react";
import Prism from "prismjs"
import {Layout} from "../../components/Layout";

const Material = ({index, materialTitle, del, edit}) => {
    return <div className="border-l-2 mt-10">
        <div className="transform transition cursor-pointer
                        hover:-translate-y-2 ml-10 relative flex items-center
                        px-6 py-4 bg-secondary text-white rounded mb-10 flex-col
                        md:flex-row space-y-4 md:space-y-0">
            <div className="w-5 h-5 bg-secondary absolute -left-10 transform
                            -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0"/>
            <div className="w-10 h-1 bg-blue-300 absolute -left-10 z-0"/>
            <div className="flex-auto">
                <h1 className="text-lg">Этап {index + 1}</h1>
                <h1 className="text-xl font-bold">{materialTitle}</h1>
            </div>
            <div className="flex flex-col space-y2">
                <button onClick={del}
                        className="text-center text-white hover:text-gray-300 bg-transparent outline-0 border-0 text-lg cursor-pointer">Удалить
                    этап
                </button>
                <button onClick={edit}
                        className="text-center text-white hover:text-gray-300 bg-transparent outline-0 border-0 text-lg cursor-pointer">Изменить
                    этап
                </button>
            </div>
        </div>
    </div>
}

const Editor = dynamic(() => import("../../components/Editor"), {ssr: false})
export default function Create() {
    const [courseTitle, setCourseTitle] = useState("")
    const [courseDescription, setCourseDescription] = useState("")

    const [courseMaterials, setCourseMaterials] = useState({})

    const [materialTitle, setMaterialTitle] = useState("")
    const [materialText, setMaterialText] = useState("<p>Click here and start typing!</p>")
    const [editingMaterial, setEditingMaterial] = useState("")
    const contentRef = useRef(null)
    useEffect(() => {
        Prism.highlightAllUnder(contentRef.current)
    }, [materialText])

    const addMaterial = () => {
        let updatedMaterials = courseMaterials
        if (editingMaterial.length === 0) {
            updatedMaterials[materialTitle] = materialText
            setCourseMaterials(updatedMaterials)
        } else {
            console.log(materialTitle !== editingMaterial)
            if (materialTitle !== editingMaterial) {
                const {[editingMaterial]: val, ...newMaterials} = courseMaterials
                updatedMaterials = newMaterials
                updatedMaterials[materialTitle] = materialText
            } else {
                updatedMaterials[editingMaterial] = materialText
            }
            setEditingMaterial("")
            setCourseMaterials(updatedMaterials)
        }
        setMaterialTitle("")
        setMaterialText("<p>Click here and start typing!</p>")
    }

    const removeMaterial = (material) => {
        const {[material]: val, ...newMaterials} = courseMaterials
        setCourseMaterials(newMaterials)
    }

    const editMaterial = (material) => {
        setEditingMaterial(material)
        setMaterialTitle(material)
        setMaterialText(courseMaterials[material])
    }

    const saveCourse = () => {

    }

    return (
        <Layout>
            <div className="w-full">
                <h2>Создание курса</h2>
                <div className="space-y-2">
                    <input placeholder="Заголовок"
                           onChange={(e) => setCourseTitle(e.target.value)}
                           className="text-black placeholder-gray-600 w-full px-4 py-2.5 text-base
                               transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200
                               ring-offset-current ring-offset-2 ring-gray-400"/>
                    <input placeholder="Описание"
                           onChange={(e) => setCourseDescription(e.target.value)}
                           className="text-black placeholder-gray-600 w-full px-4 py-2.5 text-base
                                transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200
                                ring-offset-current ring-offset-2 ring-gray-400"/>
                </div>
                <h3>Добавление материалов курса</h3>
                <div className="space-y-2">
                    <div className="flex space-x-2">
                        <button onClick={addMaterial}
                                className="bg-secondary text-white rounded-lg border-0 outline-0 px-4 py-2 text-lg">
                            Сохранить этап
                        </button>
                        {editingMaterial.length > 0 && <h4>Режим редактирования для: {editingMaterial}</h4>}
                    </div>
                    <input placeholder="Заголовок этапа"
                           value={materialTitle}
                           onChange={(e) => setMaterialTitle(e.target.value)}
                           className="text-black placeholder-gray-600 w-full px-4 py-2.5 text-base
                               transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200
                               ring-offset-current ring-offset-2 ring-gray-400"/>
                    <h4>Контент</h4>
                    <Editor data={materialText} setData={setMaterialText}/>
                </div>
                <h3>Предпросмотр контента этапа</h3>
                {Object
                    .entries(courseMaterials)
                    .map(([k, v], i) => <Material key={i} materialTitle={k}
                                                  index={i} del={() => removeMaterial(k)}
                                                  edit={() => editMaterial(k)}/>)}
                <div className="border border-gray-300 border-solid">
                    <div className="ck-content px-2" ref={contentRef}>
                        {parse(materialText)}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
