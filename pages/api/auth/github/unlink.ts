import {apiRouter} from "@lib/utils";
import UsersService from "@services/Users.service";
import {AuthGuard} from "@lib/AuthGuard";

const apiRoute = apiRouter()

apiRoute.get(AuthGuard(), async (req, res) => {
    await UsersService.unlinkGithub(req.user.id)
    res.status(200).json({message: "Аккаунт успешно отвязан"})
})

export default apiRoute