import {useQuery} from "react-query";
import axios from "axios";
import {Lesson} from "types/Lesson";

export default function useLesson(id) {
    return useQuery<Lesson, Error>(['lesson', id], () =>
            axios("/api/lessons/" + id).then(res => res.data),
        {enabled: !!id}
    )
}