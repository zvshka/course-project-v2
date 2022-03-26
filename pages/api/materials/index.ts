import {apiRouter, AuthGuard} from "@lib/utils";
import MaterialsService from "@services/MaterialsService";

const apiRoute = apiRouter()

apiRoute.post(AuthGuard("ADMIN"), async (req, res) => {
    const result = await MaterialsService.create(req.body)
    res.status(200).json(result)
})

export default apiRoute