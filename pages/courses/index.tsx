import {Layout} from "@components/Layout";
import {Course} from "@components/Course";
import Link from "next/link";
import {useQueryClient} from "react-query";
import useUser from "@hooks/useUser";
import useCourses from "@hooks/useCourses";
// import useCourses from "../../hooks/useCourses";
// import {useContext} from "react";
// import {SessionContext} from "@components/SessionProvider";

export default function Courses() {
    // Access the client
    const queryClient = useQueryClient()
    // Queries
    const userData = useUser()

    const {courses, isSuccess} = useCourses()
    return <Layout>
        <div className="w-full">
            <h2>Доступные курсы</h2>
            <div className="flex flex-col space-y-4">
                {userData.isSuccess && userData.user.role === "ADMIN" && <Link href={"/courses/create"}>
                    <button
                        className="bg-secondary text-white border-0 outline-0 px-4 py-2 rounded-lg text-lg hover:bg-blue-600 hover:shadow-2xl transition ease-in">
                        Создать курс
                    </button>
                </Link>}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {isSuccess && courses.map((c, i) => <Course key={i} course={c} progress={true}/>)}
                </div>
            </div>
        </div>
    </Layout>
}