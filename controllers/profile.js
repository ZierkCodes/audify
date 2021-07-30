import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'
import passport from 'passport'
import mongoose from 'mongoose'
import axios from 'axios'

const ObjectId = mongoose.Types.ObjectId

export {
    getUsername,
    setUsername,
    verify,
    getProfile,
    editProfile,
    updateProfile
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
    Profile.findOneAndUpdate({_id: req.user.profile._id}, {$set: {username: req.body.username, branch: req.body.branch}}, {new: true}, (err, doc) => {
        if(err) {
            console.log(err)
        }

        console.log(doc)
        res.redirect('/channels')
    })

}

function getProfile(req, res) {
    Profile.findOne({_id: req.params.id})
    .then((response) => {
        res.render('user_profile.ejs', {
            activeNav: 'none',
            title: 'Your Profile',
            profile: response,
            user: req.user
          })
    })
    .catch((error) => {
        res.send(error)
    })
}

function editProfile(req, res) {
    Profile.findById(req.user.profile._id)
    .then((response) => {
        res.render('edit_profile', {
            activeNav: 'none',
            title: 'Edit Your Profile',
            profile: response,
            user: req.user
        })
    })
}

function updateProfile(req, res) {
    Profile.findOneAndUpdate({'_id': req.user.profile._id}, {$set: {
        'username': req.body.username,
        'branch': req.body.branch,
        'about': req.body.about
    }}, {new: true}, (error, results) => {
        if(error) { console.log(error) }
        res.redirect(`/profile/${req.user.profile._id}`)
    })
}

function verify(req, res, next) {
    let config = {
        headers: {
            'apikey': process.env.VA_API_KEY,
            'Content-Type': 'application/json'
        }
    }

    let data = {
        'ssn': req.body.social,
        'last_name': req.body.last_name,
        'first_name': req.body.first_name,
        'birth_date': req.body.dob
    }

    axios.post('https://sandbox-api.va.gov/services/veteran_confirmation/v0/status', data, config)
    .then((response) => {
        console.log(response)
        // res.status(200).json(response.data)
        if(response.data.veteran_status === 'confirmed') {
            // Update User!
        } else {
            // Redirect to Profile Page and Dispaly Error
        }
    })
    .catch((error) => {
        console.log(error)
        res.json(error)
    })
}