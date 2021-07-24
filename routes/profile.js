import { Router } from 'express'
const router = Router()

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('welcome', {user: req.user})
})

// router.put('/username')

export {
  router
}
