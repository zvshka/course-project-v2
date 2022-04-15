import fs from "fs";
import ImagesService from "@services/Images.service";
import {apiRouter} from "@lib/utils";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const name = req.query.name
    const result = await ImagesService.getImage(name)
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