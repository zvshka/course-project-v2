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

apiRoute.get(async (req, res) => {
    const id = parseInt(req.query.id)
    const material = await prisma.material.findUnique({
        where: {
            id
        }
    })
    res.status(200).json({material})
})

apiRoute.patch(async (req, res) => {
    const id = parseInt(req.query.id)
    res.status(200)
})

apiRoute.delete(async (req, res) => {
    const id = parseInt(req.query.id)
    await prisma.material.delete({
        where: {
            id
        }
    })
    res.status(200)
})

apiRoute.post(async (req, res) => {

})

export default apiRoute