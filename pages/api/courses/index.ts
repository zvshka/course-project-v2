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
    const courses = await coursesService.getAll()
    res.status(200).json(courses)
})

apiRoute.post(async (req, res) => {
    await coursesService.create(JSON.parse(req.body)).catch(e => {
        res.status(400).json({error: e})
    })
})

export default apiRoute