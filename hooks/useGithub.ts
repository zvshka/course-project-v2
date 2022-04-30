import {useQuery} from "react-query";
import axios from "axios";

export default function useGithub(githubId) {
    return useQuery('github', () =>
        axios("/api/oauth/" + githubId).then(res => res.data),
        {enabled: !!githubId}
    )
}