import {apiRouter} from "@lib/utils";
import MaterialsService from "@services/MaterialsService";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const id = req.query.id
    const result = await MaterialsService.findOneById(id)
    res.status(200).json(result)
})

apiRoute.put(async (req, res) => {
    const id = req.query.id
    const data = JSON.parse(req.body)

    res.status(200)
})

apiRoute.delete(async (req, res) => {
    const id = req.query.id

    res.status(200)
})

export default apiRoute