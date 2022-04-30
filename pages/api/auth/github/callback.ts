import {apiRouter, setCookie, signToken, verifyToken} from "@lib/utils";
import axios, {AxiosResponse} from "axios";
import UsersService from "@services/Users.service";
import OAuthService from "@services/OAuth.service";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const {access_token, callbackUrl} = req.cookies
    // const tokenData = verifyToken(access_token)
    const urlSearch = new URLSearchParams({
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        code: req.query.code as string
    })

    const accessData = await axios.post(`https://github.com/login/oauth/access_token?${urlSearch.toString()}`, {}, {
        headers: {
            Accept: "application/json"
        }
    }).then(res => res.data)

    const gitUserData = await axios.get("https://api.github.com/user", {
        headers: {
            authorization: `Bearer ${accessData.access_token}`
        }
    }).then((res) => res.data)

    let githubCandidate = await OAuthService.findOneByAccountId(gitUserData.id)
    if (!githubCandidate) {
        githubCandidate = await OAuthService.create(gitUserData, accessData)
    }

    setCookie(res, 'github_id', githubCandidate.id, {httpOnly: false, path: "/auth/register"})

    const tokenData = verifyToken(access_token)
    if (tokenData) {
        const userData = await UsersService.findOneById(tokenData.id)
        if (userData) {
            if (!userData.github) {
                // Нет привязанного гитхаба, привязываем
                await OAuthService.connectById(userData.id, githubCandidate.id)
            } else {
                // Есть гитхаб
                if (userData.github.id !== githubCandidate.id) {
                    return res.redirect(callbackUrl || "/")
                } else {
                    const access_token = signToken({id: userData.id, role: userData.role})
                    setCookie(res, 'access_token', access_token, {httpOnly: true});
                }
            }
        }
    }

    res.redirect(callbackUrl || "/")
})

export default apiRoute