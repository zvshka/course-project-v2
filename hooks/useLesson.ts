import {useQuery} from "react-query";
import axios from "axios";

export default function useLesson(id) {
    return useQuery(['lesson', id], () =>
            axios("/api/lessons/" + id).then(res => res.data),
        {enabled: !!id}
    )
}