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
    User.findOne({ spotifyId: profile.id }, function (err, user) {
      if (err) return done(err)
      if (user) {
        return done(null, user)
      } else {
          console.log(profile)
        const newProfile = new Profile({
          name: profile.displayName,
          avatar: profile.photos[0].value,
        })
        const newUser = new User({
          spotifyId: profile.id,
          profile: newProfile._id
        })
        newProfile.save(function (err) {
          if (err) return done(err)
        })
        newUser.save(function (err) {
          if (err) {
            // Something went wrong while making a user - delete the profile
            // we just created to prevent orphan profiles.
            Profile.findByIdAndDelete(newProfile._id)
            return done(err)
          }
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