import fs from "fs";
import {imagesService} from "@services/images"

import {apiRouter} from "@lib/apiRouter";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const name = req.query.name
    const result = await imagesService.getImage(name)
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