import { Router } from 'express'
import * as profileCtrl from '../controllers/profile.js'

const router = Router()

/* GET users listing. */
router.get('/login', profileCtrl.getUsername)
router.post('/set', profileCtrl.setUsername)

router.get('/verify', (req, res, next) => {
  res.render('verify.ejs')
})

router.post('/verify', profileCtrl.verify)

// router.put('/username')

export {
  router
}
