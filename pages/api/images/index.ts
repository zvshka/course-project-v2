import multer from 'multer';
import {NextApiResponse} from "next";
import {apiRouter} from "@lib/utils";
import ImagesService from "@services/Images.service";
import imagemin from "imagemin";
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import fs from "fs";
import {AuthGuard} from "@lib/AuthGuard";

const oneMegabyteInBytes = 1000000;
const outputFolderName = './public/uploads';

const upload = multer({
    // limits: { fileSize: oneMegabyteInBytes * 2 },
    storage: multer.diskStorage({
        destination: outputFolderName,
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
    // storage: CustomStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, outputFolderName + file.originalname)
    //     }
    // }),
    fileFilter: (req, file, cb) => {
        const acceptFile: boolean = ['image/jpeg', 'image/png'].includes(file.mimetype);
        cb(null, acceptFile);
    },
});

const apiRoute = apiRouter()

apiRoute.use(upload.single("upload"));

apiRoute.post(AuthGuard("ADMIN"), async (req: NextApiResponse & { file: any }, res) => {
    const {filename, mimetype, size, path: filepath} = req.file;
    const minified = await imagemin([`public/uploads/${filename}`], {
        destination: 'public/uploads',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
    const result = await ImagesService.upload({filename, mimetype, size: Buffer.byteLength(minified[0].data), filepath})
    if (result) {
        res.status(200).json({url: process.env.BASE_URL + "/api/images/" + filename});
    } else {
        res.status(500).json({error: "Something went wrong!"})
    }
});

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
export default apiRoute;