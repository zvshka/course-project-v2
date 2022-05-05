import {useQuery} from "react-query";
import axios from "axios";
import {Course} from "types/Course";

export default function useCourse(id: string) {
    return useQuery<Course, Error>(['course', id], () =>
            axios("/api/courses/" + id).then(res => res.data),
        {enabled: !!id}
    )
}