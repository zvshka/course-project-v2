import multer from 'multer';
import {NextApiResponse} from "next";
import {apiRouter} from "@lib/utils";
import ImagesService from "@services/ImagesService";

const oneMegabyteInBytes = 1000000;
const outputFolderName = './public/uploads';

const upload = multer({
    // limits: { fileSize: oneMegabyteInBytes * 2 },
    storage: multer.diskStorage({
        destination: outputFolderName,
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
    /*fileFilter: (req, file, cb) => {
      const acceptFile: boolean = ['image/jpeg', 'image/png'].includes(file.mimetype);
      cb(null, acceptFile);
    },*/
});

const apiRoute = apiRouter()

apiRoute.use(upload.single("upload"));

apiRoute.post(async (req: NextApiResponse & { file: any }, res) => {
    const {filename, mimetype, size, path: filepath} = req.file;
    const result = await ImagesService.upload({filename, mimetype, size, filepath})
    if (result) {
        res.status(200).json({url: "http://localhost:3000/api/images/" + filename});
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