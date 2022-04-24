import {apiRouter, setCookie} from "@lib/utils";
import {NextApiResponse} from "next";

const apiRoute = apiRouter()

apiRoute.post(async (req, res: NextApiResponse) => {
    setCookie(res, 'access_token', "", {httpOnly: true});
    res.status(200).json({message: "Успешный выход"})
})

export default apiRoute