import usersService from "@services/users";

export const adminOnly = (req, res, next) => {
    if (req.user.role === "ADMIN") {
        return next()
    } else {
        return res.status(403).json({error: "No permissions"})
    }
}

export const processjwt = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({error: "No Auth Token"})
    const [type, token] = req.headers.authorization.split(" ")
    if (type !== "Bearer") return res.status(401).json({error: "Not valid"})
    req.user = await usersService.aboutMe(token)
    return next()
}