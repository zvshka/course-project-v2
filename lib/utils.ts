import jwt from "jsonwebtoken";
import UsersService from "@services/UsersService";
import nextConnect from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";

export const apiRouter = () => nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        console.error(error)
        res.status(501).json({error: `Sorry something Happened! ${error.message}`});
    },
    onNoMatch(req, res) {
        res.status(405).json({error: `Method '${req.method}' Not Allowed`});
    },
})

export const mapToIds = (arr) => {
    return arr.map(el => el.id)
}

interface IData {
    id: string
    role: string
}

export const signToken = (data: IData) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d"
    })
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as IData
}

export const AuthGuard = (requiredRole = "USER") => async (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({error: "No Auth Token"})
    const [type, token] = req.headers.authorization.split(" ")
    if (type !== "Bearer") return res.status(401).json({error: "Not valid"})
    try {
        const {id, role} = verifyToken(token)
        const userData = await UsersService.findOneById(id)
        if (userData && (userData.role === requiredRole || userData.role === "ADMIN"))
            req.user = userData
        return next()
    } catch (e) {
        console.error(e)
        res.status(401).json({error: "Invalid Token"})
    }
}