import {apiRouter} from "@lib/utils";
import axios from "axios";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const {code} = req.query
    const url = new URL("https://github.com/login/oauth/access_token")
    const urlSearch = new URLSearchParams({
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        code: code as string
    })
    const {data: accessData} = await axios.post(`${url}?${urlSearch.toString()}`, {}, {
        headers: {
            Accept: "application/json"
        }
    })
    const {data: userData} = await axios.get("https://api.github.com/user", {
        headers: {
            authorization: `Bearer ${accessData.access_token}`
        }
    })
    res.redirect("/")
})

export default apiRoute