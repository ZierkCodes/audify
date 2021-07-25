import { User } from '../models/user.js'

export {
    getUsername
}

function getUsername(req, res) {
    res.json(req.user.profile.name)
}