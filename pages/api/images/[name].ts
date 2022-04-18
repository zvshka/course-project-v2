import fs from "fs";
import ImagesService from "@services/Images.service";
import {apiRouter} from "@lib/utils";
import sharp from "sharp"
import {NextApiRequest} from "next";
import {MIME_TYPES} from "@mantine/dropzone";

const apiRoute = apiRouter()

apiRoute.get(async (req: NextApiRequest & { query: { width: string, quality: string } }, res) => {
    const name = req.query.name
    let {width, quality} = req.query
    if (isNaN(Number(width))) width = null
    if (isNaN(Number(quality)) || Number(quality) > 100 || Number(quality) < 0) quality = "100"
    const result = await ImagesService.getImage(name)
    if (result) {
        try {
            const imageBuffer = fs.readFileSync(result.filepath);
            const sharped = await sharp(imageBuffer)
                .resize({width: width ? parseInt(width) : null})
            if (result.mimetype === MIME_TYPES.jpeg) {
                sharped.jpeg({
                    quality: Number(quality)
                })
            } else if (result.mimetype === MIME_TYPES.png) {
                sharped.png({
                    quality: Number(quality)
                })
            }
            res.setHeader('Content-Type', result.mimetype);
            res.send(sharped);
        } catch (e) {
            res.status(400).json({error: 'Image not found'});
        }
    } else {
        res.status(400).json({error: 'Image not found'});
    }
})

export default apiRoute;