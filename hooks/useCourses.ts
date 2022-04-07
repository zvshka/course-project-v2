import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {useNotifications} from "@mantine/notifications";

export default function useCourses() {
    // Queries
    return useQuery('courses', () =>
        axios("/api/courses/").then(res =>
            res.data
        )
    )
}