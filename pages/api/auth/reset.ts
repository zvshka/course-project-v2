import {apiRouter} from "@lib/utils";
import AuthService from "@services/Auth.service";

const apiRoute = apiRouter()

apiRoute.post(async (req, res) => {
    await AuthService.resetPassword(req.body)
    res.status(200).json({message: "Пароль успешно сброшен"})
})

export default apiRoute