import prisma from "@lib/prisma";

class ImagesService {
    async upload({filename, filepath, mimetype, size}) {
        const candidate = await prisma.images.findUnique({
            where: {
                filename
            }
        })
        if (candidate) return candidate
        return await prisma.images.create({
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
        return await prisma.images.findUnique({
            where: {
                filename: name
            }
        })
    }
}

export const imagesService = new ImagesService()