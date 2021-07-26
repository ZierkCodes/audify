import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'
import passport from 'passport'

export {
    getUsername,
    setUsername

}

function getUsername(req, res) {
    console.log("GETTING USERNAME!!")
    console.log(req.user)
    if(req.user.profile._id) {
        Profile.findOne({_id: req.user.profile._id}, (err, doc) => {
            if(err) {
                console.log(err)
            }
    
            if(doc.username) {
                res.redirect('/channels')
            } else {
                res.redirect('/welcome')
            }
        })
    }
}

function setUsername(req, res) {
    Profile.findOneAndUpdate({_id: req.user.profile._id}, {$set: {username: req.body.username}}, {new: true}, (err, doc) => {
        if(err) {
            console.log(err)
        }

        console.log(doc)
        res.redirect('/channels')
    })


    // User.findById(req.user._id, (error, user) => {
    //     if(!user) {
    //         console.log("User not found")
    //     } else {
    //         console.log("SET USERNAME")
    //         console.log("INPUT: " + req.body.username)
    //         user.profile.username = req.body.username
    //         user.save().then(() => {
    //             console.log("SAVED!!!!!!!!")
    //             console.log(user)
    //             res.redirect('/channels')
    //             // Update req.user
    //             // res.redirect...
    //         })
    //     }
    // })

}