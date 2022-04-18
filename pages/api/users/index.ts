import {apiRouter} from "@lib/utils";
import UsersService from "@services/Users.service";
import {AuthGuard} from "@lib/AuthGuard";

const apiRoute = apiRouter()

apiRoute.get(AuthGuard("ADMIN"), async (req, res) => {
    const users = await UsersService.getAllUsers()
    res.status(200).json(users)
})

export default apiRoute