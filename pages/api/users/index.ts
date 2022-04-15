import {AuthGuard} from "@lib/utils";
import {apiRouter} from "@lib/utils";
import UsersService from "@services/Users.service";

const apiRoute = apiRouter()

apiRoute.get(AuthGuard("ADMIN"), async (req, res) => {
    const users = await UsersService.getAllUsers()
    res.status(200).json(users)
})

export default apiRoute