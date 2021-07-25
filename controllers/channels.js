import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'

export {
    isRegistered,
    registerUsername
}

function isRegistered(req, res, next) {

}

function registerUsername(req, res, next) {
    console.log("PROFILE!")
    console.log("==========================")
    console.log(req.user.profile._id)
    
    // User.find({req.user.id})
}

