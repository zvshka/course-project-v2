// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import multer from "multer";
//
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: './public/uploads',
//         filename: (req, file, cb) => cb(null, file.originalname),
//     }),
// });
//
// const handlePost = async (req, res) => {
//     console.log(req.headers)
//     console.log(upload.single(req.body).file)
// }
//
// export default function handler(req, res) {
//     switch (req.method) {
//         case "POST":
//             handlePost(req, res)
//             break
//     }
// }
import nextConnect from 'next-connect';
import multer from 'multer';
import prisma from "../../../lib/prisma";

const oneMegabyteInBytes = 1000000;
const outputFolderName = './public/uploads';

const upload = multer({
    // limits: { fileSize: oneMegabyteInBytes * 2 },
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
    /*fileFilter: (req, file, cb) => {
      const acceptFile: boolean = ['image/jpeg', 'image/png'].includes(file.mimetype);
      cb(null, acceptFile);
    },*/
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.error(error)
        res.status(501).json({error: `Sorry something Happened! ${error.message}`});
    },
    onNoMatch(req, res) {
        res.status(405).json({error: `Method '${req.method}' Not Allowed`});
    },
});

apiRoute.use(upload.single("upload"));

apiRoute.post(async (req, res) => {
    const {filename, mimetype, size, path: filepath} = req.file;
    const candidate = await prisma.images.findUnique({
        where: {
            filename
        }
    })

    if (candidate) return res.status(200).json({url: "http://localhost:3000/api/images/" + filename});

    const result = await prisma.images.create({
        data: {
            filepath,
            filename,
            mimetype,
            size
        }
    }).catch(e => {
        console.error(e)
        return null
    })
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