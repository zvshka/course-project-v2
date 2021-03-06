import AuthService from "@services/Auth.service";
import {apiRouter, setCookie} from "@lib/utils";
import {NextApiResponse} from "next";

const apiRoute = apiRouter()

apiRoute.post(async (req, res: NextApiResponse) => {
    const data = await AuthService.login(req.body)
    setCookie(res,'access_token', data.accessToken, { httpOnly: true });
    res.json(data)
})

export default apiRoute