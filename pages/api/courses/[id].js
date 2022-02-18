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
    const id = req.query.id
    const course = await prisma.course.findUnique({
        where: {
            id
        },
        include: {
            materials: true
        }
    })
    res.status(200).json({course})
})

apiRoute.patch(async (req, res) => {
    const id = req.query.id
    res.status(200)
})

apiRoute.delete(async (req, res) => {
    const id = req.query.id
    await prisma.course.delete({
        where: {
            id
        }
    })
    res.status(200)
})

apiRoute.post(async (req, res) => {

})

export default apiRoute