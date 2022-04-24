import {apiRouter} from "@lib/utils";
import StagesService from "@services/Stages.service";
import {AuthGuard} from "@lib/AuthGuard";

const apiRoute = apiRouter()

apiRoute.patch(AuthGuard({isAdmin: true}), async (req, res) => {
    await StagesService.updateOne(req.query.id, req.body)
    res.status(200).json({message: 'Этап успешно обновлен'})
})

apiRoute.delete(AuthGuard({isAdmin: true}), async (req, res) => {
    await StagesService.deleteOneById(req.query.id)
    res.status(200).json({message: "Этап успешно удален"})
})

export default apiRoute