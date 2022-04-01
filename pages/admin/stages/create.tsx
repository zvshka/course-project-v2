// import {Layout} from "@components/Layout";
// import dynamic from "next/dynamic";
// import {useEffect, useRef, useState} from "react";
// import parse from "html-react-parser"
// import Prism from "@lib/prism"
// import {useRouter} from "next/router";
// import Link from "next/link";
// import axios from "axios";
//
// const Editor = dynamic(() => import("@components/Editor"), {ssr: false})
// export default function Material() {
//     const router = useRouter()
//     const [materialTitle, setMaterialTitle] = useState("")
//     const [materialText, setMaterialText] = useState("")
//
//     const contentRef = useRef(null)
//     useEffect(() => {
//         contentRef.current && Prism.highlightAllUnder(contentRef.current)
//     }, [materialText])
//
//     const saveMaterial = (e) => {
//         e.preventDefault()
//         axios("http://localhost:3000/api/materials", {
//             method: "POST",
//             data: {
//                 title: materialTitle,
//                 text: materialText,
//                 courseId: router.query.courseId
//             },
//             headers: {
//                 "Authorization": "Bearer " + localStorage.getItem("accessToken"),
//                 "Content-Type": "application/json"
//             }
//         }).catch(console.error)
//     }
//
//     return <Layout>
//         <div className="w-full">
//             <h2>Добавление материалов курса</h2>
//             <div className="space-y-2">
//                 <div className="flex space-x-4">
//                     <Link href={"/courses/" + router.query.courseId}>
//                         <button className="bg-secondary text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-blue-600 hover:shadow-2xl transition ease-in">
//                             Назад к курсу
//                         </button>
//                     </Link>
//                     <button onClick={saveMaterial} className="bg-secondary text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-blue-600 hover:shadow-2xl transition ease-in">
//                         Сохранить
//                     </button>
//                 </div>
//                 <input placeholder="Заголовок"
//                        value={materialTitle}
//                        onChange={(e) => setMaterialTitle(e.target.value)}
//                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 text-base outline-gray-400
//                                transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200"/>
//                 <Editor data={materialText} setData={setMaterialText}/>
//             </div>
//             <h2>Предпросмотр контента</h2>
//             <div className="border border-gray-300 border-solid">
//                 <div className="ck-content px-[0.6em]" ref={contentRef}>
//                     {parse(materialText)}
//                 </div>
//             </div>
//         </div>
//     </Layout>
// }

import useCourses from "@hooks/useCourses";
import {Shell} from "@components/Layout/Shell";
import {Box, Button, Group, LoadingOverlay, Select, TextInput, Title, useMantineTheme} from "@mantine/core";
import {useEffect, useState} from "react";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {dropzoneChildren} from "@components/Content/Dropzone";
import {useNotifications} from "@mantine/notifications";
import {useForm} from "@mantine/form";
import axios from "axios";
import {CheckIcon} from "@modulz/radix-icons";

interface iconObject {
    data: string
    file: null | File
}

interface initialValues {
    title: string
    selectedCourse: string
    icon: iconObject
}

export default function CreateStage() {
    const theme = useMantineTheme()
    const coursesData = useCourses()
    const [data, setData] = useState([])
    const notifications = useNotifications()
    const [loading, setLoading] = useState(false)
    const form = useForm<initialValues>({
        initialValues: {
            title: "",
            selectedCourse: "",
            icon: {
                data: '',
                file: null
            }
        }
    });

    const handleSubmit = (values: typeof form.values) => {
        const formData = new FormData()
        formData.append('upload', form.values.icon.file)
        setLoading(true)
        axios.post("/api/images", formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": 'Bearer ' + localStorage.getItem('accessToken')
            }
        }).then(res => {
            axios.post("/api/stages", {
                title: values.title,
                iconURL: res.data.url,
                courseId: values.selectedCourse,
            }, {
                headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
                .then(res => {
                    setLoading(false)
                    notifications.showNotification({
                        title: "Успех",
                        message: "Курс был успешно создан",
                        color: "green",
                        icon: <CheckIcon />
                    })
                })
                .catch(error => {
                    setLoading(false)
                    notifications.showNotification({
                        title: "Ошибка",
                        message: "При создании курса произошла ошибка",
                        color: "red"
                    })
                })
        })
            .catch(error => {
                setLoading(false)
                notifications.showNotification({
                    title: "Ошибка",
                    message: "При загрузке изображения произошла ошибка",
                    color: "red"
                })
            })
    }

    useEffect(() => {
        coursesData.isSuccess && setData(coursesData.courses.map(course => ({value: course.id, label: course.title})))
    }, [coursesData.isSuccess, coursesData.isLoading])

    return <Shell>
        <Title order={2} sx={{textAlign: "center"}}>
            Создание этапа курса
        </Title>
        <Box mx="auto" sx={{maxWidth: "30rem", position: "relative"}}>
            <LoadingOverlay visible={loading}/>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Select data={data}
                        label="Выбери курс, для которого хочешь создать этап"
                        placeholder="Выбери один"
                        searchable
                        clearable
                        nothingFound="Ничего не найдено"
                        {...form.getInputProps('selectedCourse')}
                />
                <TextInput disabled={!form.values.selectedCourse || form.values.selectedCourse.length === 0}
                           label='Заголовок этапа'
                           {...form.getInputProps('title')}
                />
                <Dropzone
                    disabled={!form.values.selectedCourse || form.values.selectedCourse.length === 0}
                    onDrop={(files) => {
                        const reader = new FileReader()
                        reader.onload = (e) => {
                            form.setFieldValue('icon', {
                                data: e.target.result as string,
                                file: files[0]
                            })
                        }

                        reader.readAsDataURL(files[0])
                    }}
                    multiple={false}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={3 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                    my={"md"}
                >
                    {(status) => dropzoneChildren(status, theme, form.values.icon.data)}
                </Dropzone>
                <Group position="right" mt="md">
                    <Button type="submit"
                            disabled={!form.values.selectedCourse || form.values.selectedCourse.length === 0}
                            sx={{backgroundColor: '#228be6 !important'}}>Отправить</Button>
                </Group>
            </form>
        </Box>
    </Shell>
}