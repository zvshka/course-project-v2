import UsersService from "@services/Users.service";
import {apiRouter} from "@lib/utils";
import {AuthGuard} from "@lib/AuthGuard";

const apiRoute = apiRouter()

apiRoute.get(AuthGuard(), async (req, res) => {
    const data = await UsersService.getUserActiveCourses(req.user.id)
    return res.status(200).json(data)
})

export default apiRoute