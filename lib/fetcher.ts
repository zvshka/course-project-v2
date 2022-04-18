import axios from "axios";

export const fetcher = (url, {auth = false, headers = {}, ...props}) => {
    return axios(url, {
        ...props,
        headers: {
            ...headers,
            authorization: auth && 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
}