import {Badge} from "./Badge";
import Link from "next/link";

export const Course = ({course, progress = false}) => {
    console.log(course)
    return (
        <div className="overflow-hidden shadow-lg transition
            duration-500 ease-in-out transform hover:-translate-y-2
            hover:shadow-2xl rounded-lg h-90 w-70 md:w-90 cursor-pointer bg-gray-200 border-gray-400 border-solid">
            <Link href={`/courses/${course.id}`}>
                <a className="w-full block h-full">
                    <div className="w-full p-4">
                        <p className="text-secondary text-2xl font-medium">
                            {course.title}
                        </p>
                        <p className="text-gray-600 font-light text-md">
                            {course.description}
                            {/*<a className="inline-flex text-secondary" href="#">Просмотреть...</a>*/}
                        </p>
                        {/*<div className="flex flex-wrap justify-starts*/}
                        {/*items-center py-3 border-b-2 text-xs text-white font-medium">*/}
                        {/*    {course.tags && course.tags.map((t, i) => <Badge text={"#" + t} key={i}/>)}*/}
                        {/*</div>*/}
                        {/*<div className={`flex items-center mt-2 ${progress ? "border-b-2 pb-2" : ""}`}>*/}
                        {/*    <img className='w-10 h-10 object-cover rounded-full' alt='User avatar'*/}
                        {/*         src={course.author.avatar}/>*/}

                        {/*    <div className="pl-3">*/}
                        {/*        <div className="font-medium">*/}
                        {/*            {course.author.firstName} {course.author.lastName}*/}
                        {/*        </div>*/}
                        {/*        <div className="text-gray-600 text-sm">*/}
                        {/*            {course.author.position}*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {progress && <div className="flex flex-col my-2">
                            <div className="text-xs mb-2">
                                0/12 Выполнено
                            </div>
                            <div className="w-full bg-gray-400 p-0">
                                <div className="w-0 bg-secondary h-1"/>
                            </div>
                        </div>}
                    </div>
                </a>
            </Link>
        </div>
    )
}