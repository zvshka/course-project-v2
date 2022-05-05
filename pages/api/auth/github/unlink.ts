import {apiRouter} from "@lib/utils";
import {AuthGuard} from "@lib/AuthGuard";
import OAuthService from "@services/OAuth.service";

const apiRoute = apiRouter()

apiRoute.get(AuthGuard(), async (req, res) => {
    await OAuthService.unlinkByUserId(req.user.id)
    res.status(200).json({message: "Аккаунт успешно отвязан"})
})

export default apiRoute