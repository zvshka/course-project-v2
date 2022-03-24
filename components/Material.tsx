import Link from "next/link";
export const Material = ({index, href, title, remove, edit}) => {
    return <Link href={href}>
        <div className="border-l-2 mt-10">
            <div className="cursor-pointer ml-10 relative flex md:items-center
                        px-6 py-4 bg-secondary text-white rounded mb-10 flex-col
                        md:flex-row space-y-4 md:space-y-0">
                <div className="w-5 h-5 bg-secondary absolute -left-10 transform
                            -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0"/>
                <div className="w-10 h-1 bg-blue-300 absolute -left-10 z-0"/>
                <div className="flex-auto">
                    <h1 className="text-lg m-0">Этап {index + 1}</h1>
                    <h1 className="text-xl font-bold m-0">{title}</h1>
                </div>
                {/*<div className="flex flex-col space-y2">*/}
                {/*    <button onClick={remove}*/}
                {/*            className="text-center text-white hover:text-gray-300 bg-transparent outline-0 border-0 text-lg cursor-pointer">Удалить*/}
                {/*        этап*/}
                {/*    </button>*/}
                {/*    <button onClick={edit}*/}
                {/*            className="text-center text-white hover:text-gray-300 bg-transparent outline-0 border-0 text-lg cursor-pointer">Изменить*/}
                {/*        этап*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </div>
    </Link>
}