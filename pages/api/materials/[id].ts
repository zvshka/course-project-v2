import nextConnect from 'next-connect';
import {NextApiRequest, NextApiResponse} from "next";
import {materialsService} from "@services/materials";

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

    res.status(200)
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