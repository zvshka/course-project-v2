import nextConnect from 'next-connect';
import * as path from "path";
import fs from "fs";
import prisma from "../../../lib/prisma";

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.error(error)
        res.status(501).json({error: `Sorry something Happened! ${error.message}`});
    },
    onNoMatch(req, res) {
        res.status(405).json({error: `Method '${req.method}' Not Allowed`});
    },
});

apiRoute.get(async (req, res) => {
    const name = req.query.name
    const result = await prisma.images.findUnique({
        where: {
            filename: name
        }
    })
    if (result) {
        try {
            const imageBuffer = fs.readFileSync(result.filepath);
            res.setHeader('Content-Type', result.mimetype);
            res.send(imageBuffer);
        } catch (e) {
            res.status(400).json({error: 'Image not found'});
        }
    } else {
        res.status(400).json({error: 'Image not found'});
    }
})

export default apiRoute;