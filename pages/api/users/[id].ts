import {apiRouter} from "@lib/utils";
import {AuthGuard} from "@lib/AuthGuard";
import UsersService from "@services/Users.service";

const apiRoute = apiRouter()

apiRoute.patch(AuthGuard(), async (req, res) => {
    const {id} = req.query
    await UsersService.updateOneById(id as string, req.body)
    res.status(200).json({message: "Данные успешно обновлены"})
})

export default apiRoute