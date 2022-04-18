import UsersService from "@services/Users.service";
import {verifyToken} from "@lib/utils";

export const AuthGuard = (requiredRole = "USER") => async (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({error: "No Auth Token"})
    const [type, token] = req.headers.authorization.split(" ")
    if (type !== "Bearer") return res.status(401).json({error: "Not valid"})
    try {
        const {id, role} = verifyToken(token)
        const userData = await UsersService.findOneById(id)
        if (!userData) return res.status(401)
        if (userData && (userData.role === requiredRole || userData.role === "ADMIN"))
            req.user = userData
        return next()
    } catch (e) {
        console.error(e)
        res.status(401).json({error: "Invalid Token"})
    }
}