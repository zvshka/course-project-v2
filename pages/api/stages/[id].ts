import {apiRouter, AuthGuard} from "@lib/utils";
import StagesService from "@services/StagesService";

const apiRoute = apiRouter()

apiRoute.delete(AuthGuard('ADMIN'), async (req, res) => {
    const id = req.query.id
    await StagesService.deleteOneById(id)
    res.status(200).json({message: "Этап успешно удален"})
})

export default apiRoute