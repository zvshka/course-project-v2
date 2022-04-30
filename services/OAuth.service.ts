import prisma from "@lib/prisma";

class OAuthService {
    async findOneById(id) {
        return await prisma.github.findUnique({
            where: {id}
        })
    }

    async findOneByAccountId(id) {
        return await prisma.github.findUnique({
            where: {
                accountId: id
            }
        })
    }

    async create(accountData, accessData) {
        return await prisma.github.create({
            data: {
                login: accountData.login,
                accountId: accountData.id,
                email: accountData.email,
                name: accountData.name,
                refresh_token: accessData.refresh_token,
                refresh_expires: accessData.refresh_token_expires_in + Date.now(),
                access_token: accessData.access_token,
                access_expires: accessData.expires_in + Date.now()
            }
        })
    }

    async connectById(userId, githubId) {
        return await prisma.github.update({
            where: {id: githubId},
            data: {userId}
        })
    }

    async unlinkByUserId(userId) {
        return await prisma.github.update({
            where: {userId},
            data: {
                userId: null
            }
        })
    }
}

export default new OAuthService()