import prisma from "@lib/prisma";

class ImagesService {
    async upload({filename, filepath, mimetype, size}) {
        const candidate = await prisma.image.findUnique({
            where: {
                filename
            }
        })
        if (candidate) return candidate
        return await prisma.image.create({
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
    }

    async getImage(name) {
        return await prisma.image.findUnique({
            where: {
                filename: name
            }
        })
    }
}

export default new ImagesService()