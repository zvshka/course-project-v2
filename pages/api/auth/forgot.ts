import {apiRouter} from "@lib/utils";
import AuthService from "@services/Auth.service";

const apiRoute = apiRouter()

apiRoute.post(async (req, res) => {
    await AuthService.forgotPassword(req.body.email)
    res.status(200).json({message: "На ваш email выслано письмо с сылкой для восстановления"})
})

export default apiRoute