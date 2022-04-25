import {apiRouter, setCookie, signToken, verifyToken} from "@lib/utils";
import axios from "axios";
import UsersService from "@services/Users.service";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const {code} = req.query

    const access_token = req.cookies.access_token
    const tokenData = verifyToken(access_token)

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
    const {data: gitUserData} = await axios.get("https://api.github.com/user", {
        headers: {
            authorization: `Bearer ${accessData.access_token}`
        }
    })
    if (tokenData) {
        const userData = await UsersService.findOneById(tokenData.id)
        console.log(userData)
        await UsersService.connectGithub({
            id: gitUserData.id,
            access_token: accessData.access_token,
            access_expires: accessData.expires_in,
            refresh_token: accessData.refresh_token,
            refresh_expires: accessData.refresh_token_expires_in,
            userId: userData.id
        })
    } else {
        const userData = await UsersService.findOneByGithub(gitUserData.id)
        if (!userData) return res.redirect(`/auth/login?${new URLSearchParams({
            error: "No user this that github"
        })}`)
        const access_token = signToken({id: userData.id, role: userData.role})
        setCookie(res, 'access_token', access_token, {httpOnly: true});
        // res.json({accessToken: access_token})
    }

    res.redirect("/")
})

export default apiRoute