import nextConnect from 'next-connect';
import prisma from "../../../lib/prisma";

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.error(error)
        res.status(501).json({error: `Sorry something Happened! ${error.message}`});
    },
    onNoMatch(req, res) {
        res.status(405).json({error: `Method '${req.method}' Not Allowed`});
    },
})

apiRoute.post(async (req, res) => {
    await prisma.material.create({
        data: JSON.parse(req.body)
    }).catch(e => {
        res.status(400).json({error: e.message})
    })
})

export default apiRoute