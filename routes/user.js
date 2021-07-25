import { Router } from 'express'
import * as userCtrl from '../controllers/user.js'

const router = Router()

/* GET users listing. */
router.get('/name', isLoggedIn, userCtrl.getUsername)
// router.put('/name')

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.redirect('/auth/spotify')
}

export {
  router
}
