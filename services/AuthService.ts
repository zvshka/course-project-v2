import prisma from "@lib/prisma";
import bcrypt from "bcrypt";
import {signToken} from "@lib/utils";


class AuthService {

    async register(registerDTO) {
        const {email, username, password} = registerDTO
        const candidate = await prisma.user.findMany({
            where: {
                OR: [{username}, {email}]
            }
        })
        if (candidate.length > 0) throw new Error("Email or username already in use")
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                email, username,
                password: hashPassword
            }
        })
        const accessToken = signToken({id: user.id, role: user.role})
        return {accessToken}
    }

    async login(loginDTO) {
        console.log(loginDTO)
        const {email, password} = loginDTO
        const candidate = await prisma.user.findUnique({
            where: {email}
        })
        if (!candidate) throw new Error("No user with that email")
        const passwordEquals = await bcrypt.compare(password, candidate.password)
        if (!passwordEquals) throw new Error("Passwords did not match")
        const accessToken = signToken({id: candidate.id, role: candidate.role})
        return {accessToken}
    }
}

export default new AuthService()