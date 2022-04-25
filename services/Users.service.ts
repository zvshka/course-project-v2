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
        return await prisma.user.findFirst({
            where: {
                github: {id}
            }
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

    async unlinkGithub(userId) {
        return await prisma.github.delete({
            where: {
                userId
            }
        })
    }

    async updateOneById(id: string, updateDTO: any) {
        return await prisma.user.update({
            where: {id},
            data: {
                firstname: updateDTO.firstname,
                lastname: updateDTO.lastname,
                avatarURL: updateDTO.avatarURL
            }
        })
    }
}

export default new UsersService()