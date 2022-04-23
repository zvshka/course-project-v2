import {apiRouter} from "@lib/utils";

const apiRoute = apiRouter()

apiRoute
    .get((req, res) => {
        const url = "https://github.com/login/oauth/authorize"
        const urlSearch = new URLSearchParams({
            client_id: process.env.GITHUB_ID,
            scope: "user",
            redirect_uri: "http://localhost:3000/api/auth/github/callback",
        })
        res.redirect(`${url}?${urlSearch}`)
    })

export default apiRoute