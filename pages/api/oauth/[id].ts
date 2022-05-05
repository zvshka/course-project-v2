import {apiRouter} from "@lib/utils";
import OAuthService from "@services/OAuth.service";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const githubCandidate = await OAuthService.findOneById(req.query.id as string)
    if (!githubCandidate) return res.status(404).json({error: "Не верный id"})
    const {refresh_expires, refresh_token, access_token, access_expires, ...toReturn} = githubCandidate

    res.status(200).json(toReturn)
})

export default apiRoute