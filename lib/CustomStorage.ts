import fs from "fs"
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

function getDestination(req, file, cb) {
    cb(null, '/dev/null')
}

export class CustomStorage {
    private readonly getDestination: (req, file, cb) => void;

    constructor(opts) {
        this.getDestination = (opts.destination || getDestination)
    }

    _handleFile(req, file, cb) {
        this.getDestination(req, file, function (err, path) {
            if (err) return cb(err)
            console.log(file)
            imagemin(file, {
                plugins: [
                    imageminJpegtran(),
                    imageminPngquant({
                        quality: [0.6, 0.8]
                    })
                ]
            }).then(image => {
                console.log(image)
            })
            const outStream = fs.createWriteStream(path)

            file.stream.pipe(outStream)
            outStream.on('error', cb)
            outStream.on('finish', function () {
                cb(null, {
                    path: path,
                    size: outStream.bytesWritten,
                    filename: file.originalname,
                    mimetype: file.mimetype
                })
            })
        })
    }

    _removeFile(req, file, cb) {
        fs.unlink(file.path, cb)
    }
}

const toExport = (opts) => new CustomStorage(opts)
export default toExport