import {useQuery} from "react-query";
import axios from "axios";

export default function useCourses() {
    // Queries
    return useQuery('courses', () =>
        axios("/api/courses/").then(res =>
            res.data
        )
    )
}