import UsersService from "@services/Users.service";
import {verifyToken} from "@lib/utils";
import {NextApiRequest, NextApiResponse} from "next";

export const AuthGuard = ({isAdmin} = {isAdmin: false}) => async (req: NextApiRequest & { user: any }, res: NextApiResponse, next) => {
    let access_token;
    if (req.headers.authorization) {
        const [type, token] = req.headers.authorization.split(" ")
        if (type !== "Bearer") return res.status(401).json({error: "Токен авторизации имеет не верную форму"})
        access_token = token
    } else {
        access_token = req.cookies.access_token
    }
    if (!access_token) return res.status(401).json({error: "Нет токена авторизации"})
    try {
        const tokenData = verifyToken(access_token)
        if (!tokenData) return res.status(401).json({error: "Не правильный токен авторизации"})
        const userData = await UsersService.findOneById(tokenData.id)
        if (!userData) return res.status(401).json({error: "Пользователя с таким id нет в базе данных"})
        if (userData) req.user = userData
        if (isAdmin && userData.role !== "ADMIN") return res.status(403).json({error: "Нет доступа"})
        return next()
    } catch (e) {
        console.error(e)
        res.status(401).json({error: "Не правильный токен авторизации"})
    }
}