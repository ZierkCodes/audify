import { Router } from 'express'
// import * as profileCtrl from '../controllers/profile.js'

const router = Router()

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('welcome', {user: req.user})
})

// router.put('/username')

export {
  router
}
