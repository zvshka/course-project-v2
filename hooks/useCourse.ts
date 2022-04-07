import {useQuery} from "react-query";
import axios from "axios";

export default function useCourse(id) {
    return useQuery(['course', id], () =>
            axios("/api/courses/" + id).then(res => res.data),
        {enabled: !!id}
    )
}