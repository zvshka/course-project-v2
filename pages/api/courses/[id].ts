import nextConnect from 'next-connect';
import {coursesService} from "@services/courses";
import {NextApiRequest, NextApiResponse} from "next";

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        console.error(error)
        res.status(501).json({error: `Sorry something Happened! ${error.message}`});
    },
    onNoMatch(req, res) {
        res.status(405).json({error: `Method '${req.method}' Not Allowed`});
    },
})

apiRoute.get(async (req, res) => {
    const id = req.query.id
    const course = await coursesService.findOneById(id)
    res.status(200).json({...course})
})

apiRoute.patch(async (req, res) => {
    const id = req.query.id
    res.status(200)
})

apiRoute.delete(async (req, res) => {
    const id = req.query.id
    await coursesService.deleteOneById(id)
    res.status(200)
})

apiRoute.post(async (req, res) => {

})

export default apiRoute