import { Router } from 'express'
import passport from 'passport'

export {
  router
}

const router = Router()

router.get(
  '/spotify',
  passport.authenticate('spotify')
)

router.get(
  '/spotify/oauth2callback',
  passport.authenticate('spotify', {
    successRedirect: '/profile/login',
    failureRedirect: '/auth/spotify',
  })
)

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})