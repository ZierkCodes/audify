import { Router } from 'express'
import passport from 'passport'

export {
  router
}

const router = Router()

router.get(
  '/google',
  passport.authenticate('google', {scope: ['profile', 'email']})
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/profile/login',
    failureRedirect: '/auth/google',
  })
)

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})