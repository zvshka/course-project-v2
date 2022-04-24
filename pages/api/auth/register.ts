import AuthService from "@services/Auth.service";
import {apiRouter, setCookie} from "@lib/utils";

const apiRoute = apiRouter()

apiRoute.post(async (req, res, next) => {
    const data = await AuthService.register(req.body)
    setCookie(res,'access_token', data.accessToken, { httpOnly: true });
    res.json(data)
})

export default apiRoute