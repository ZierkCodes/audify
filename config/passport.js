import passport from 'passport'
import { Strategy as SpotifyStrategy } from 'passport-spotify'
import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT,
    clientSecret: process.env.SPOTIFY_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK
},
function (accessToken, refreshToken, profile, done) {
    console.log("PROFILE ID: " + profile.id)
    User.findOne({ 'spotify_id': profile.id }, function (err, user) {
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
          avatar: profile.photos[0].value,
        })
        const newUser = new User({
          spotify_id: profile.id,
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
    .populate('profile', 'name avatar')
    .exec(function(err, user) {
      done(err, user)
    })
  })