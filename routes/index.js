import { Router } from 'express'
import * as indexCtrl from '../controllers/index.js'
const router = Router()

/* GET home page. */

// router.get('/', isLoggedIn, indexCtrl.index)
router.get('/', (req, res, next) => {
  res.render('index', {title: "VetNet"})
})

router.get('/welcome', (req, res, next) => {
  res.render('welcome', {user: req.user})
})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect("/auth/google")
}

export { 
  router
}
