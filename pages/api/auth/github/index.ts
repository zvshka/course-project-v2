import {apiRouter, setCookie} from "@lib/utils";

const apiRoute = apiRouter()

apiRoute
    .get(async (req, res) => {
        const urlSearch = new URLSearchParams({
            client_id: process.env.GITHUB_ID,
            redirect_uri: "http://localhost:3000/api/auth/github/callback",
        })
        setCookie(res, 'callbackUrl', req.query.callbackUrl)
        res.redirect(`https://github.com/login/oauth/authorize?${urlSearch}`)
    })

export default apiRoute