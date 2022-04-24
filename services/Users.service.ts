import prisma from "@lib/prisma";

class UsersService {
    async getAllUsers() {
        return (await prisma.user.findMany()).map(user => {
            const {password, ...userData} = user
            return userData
        })
    }

    async connectGithub(githubDTO) {
        return await prisma.github.create({
            data: {
                id: githubDTO.id,
                access_token: githubDTO.access_token,
                access_expires: githubDTO.access_expires,
                refresh_token: githubDTO.refresh_token,
                refresh_expires: githubDTO.refresh_expires,
                userId: githubDTO.userId
            }
        })
    }

    async findOneByGithub(id) {
        const github = await prisma.github.findUnique({
            where: {id}
        })
        return await prisma.user.findUnique({
            where: {id: github.userId}
        })
    }

    async findOneById(id) {
        const userData = await prisma.user.findUnique({
            where: {id},
            include: {
                github: true
            }
        })
        if (userData) {
            const {password, ...user} = userData
            return user
        }
        return userData
    }
}

export default new UsersService()