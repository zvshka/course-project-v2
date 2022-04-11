import {apiRouter, AuthGuard} from "@lib/utils";
import StagesService from "@services/StagesService";

const apiRoute = apiRouter()

apiRoute.post(AuthGuard("ADMIN"), async (req, res) => {
    await StagesService.create(req.body)
    res.status(200).json({message: "Success"})
})

apiRoute.patch(AuthGuard('ADMIN'), async (req, res) => {
    await StagesService.updateMany(req.body)
    res.status(200).json({message: "Успешно обновлены позиции"})
})

export default apiRoute