import {verifyToken} from "@lib/tokens";
import prisma from "@lib/prisma";

class UsersService {
    async getAllUsers() {
        return (await prisma.user.findMany()).map(user => {
            const {password: _, ...userData} = user
            return userData
        })
    }

    async aboutMe(accessToken) {
        const {id} = verifyToken(accessToken)
        const {password: _, ...candidate} = await prisma.user.findUnique({
            where: {id},
        })
        return candidate
    }

    async editProfile() {

    }
}

export default new UsersService()