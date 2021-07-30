import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},
function (accessToken, refreshToken, profile, done) {
    console.log("GOOGLE ID: " + profile.id)
    User.findOne({ 'google_id': profile.id }, function (err, user) {
      console.log("USER: ")
      console.log(user)
      if (err) return done(err)
      if (user) {
        return done(null, user)
      } else {
          console.log("Am I running?")
          console.log(profile)
        const newProfile = new Profile({
          name: profile.displayName,
          username: '',
          verified_military: false,
          military_status: '',
          avatar: profile.photos[0].value,
        })
        const newUser = new User({
          google_id: profile.id,
          email: profile.emails[0].value,
          profile: newProfile._id
        })
        newProfile.save(function (err, prof) {
          if (err) return done(err)
          console.log("SAVED PROFILE")
          console.log(prof)
        })
        newUser.save(function (err) {
          if (err) {
            console.log("ERROR: " + err)
            // Something went wrong while making a user - delete the profile
            // we just created to prevent orphan profiles.
            Profile.findByIdAndDelete(newProfile._id)
            return done(err)
          }
          console.log("SAVED USER")
          console.log(newUser)
          return done(null, newUser)
        })
      }
    })
  }
))

passport.serializeUser(function (user, done) {
    done(null, user.id)
  })
  
  passport.deserializeUser(function (id, done) {
    User.findById(id)
    .populate('profile', 'name username avatar verified_military branch about')
    .exec(function(err, user) {
      done(err, user)
    })
  })
