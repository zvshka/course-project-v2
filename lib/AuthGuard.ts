import UsersService from "@services/Users.service";
import {verifyToken} from "@lib/utils";
import {NextApiRequest, NextApiResponse} from "next";

export const AuthGuard = (requiredRole = "USER") => async (req: NextApiRequest & {user: any}, res: NextApiResponse, next) => {
    if (!req.headers.authorization) return res.status(401).json({error: "Нет токена авторизации"})
    const [type, token] = req.headers.authorization.split(" ")
    if (type !== "Bearer") return res.status(401).json({error: "Токен авторизации имеет не верную форму"})
    try {
        const {id, role} = verifyToken(token)
        const userData = await UsersService.findOneById(id)
        if (!userData) return res.status(401).json({error: "Пользователя с таким id нет в базе данных"})
        if (userData && (userData.role === requiredRole || userData.role === "ADMIN"))
            req.user = userData
        return next()
    } catch (e) {
        console.error(e)
        res.status(401).json({error: "Не правильный токен авторизации"})
    }
}