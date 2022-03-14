import users from "@services/users";

export const adminOnly = (req, res, next) => {
    if (req.user.role === "ADMIN") {
        return next()
    } else {
        return res.status(401)
    }
}

export const processjwt = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(401)
    const [type, token] = req.headers.authorization.split(" ")
    if (type !== "Bearer") return res.status(401)
    req.user = await users.aboutMe(token)
    return next()
}