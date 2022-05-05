import {apiRouter} from "@lib/utils";
import AuthService from "@services/Auth.service";
import {AuthGuard} from "@lib/AuthGuard";

const apiRoute = apiRouter()

apiRoute.post(AuthGuard(), async (req, res) => {
    await AuthService.sendVerification(req.user.id)
    res.status(200).json({message: "Email успешно отправлен"})
})

apiRoute.get(async (req, res) => {
    await AuthService.confirmEmail(req.query.code as string)
    res.redirect("/")
})

export default apiRoute