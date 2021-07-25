import { Router } from 'express'
// import * as channelsCtrl from '../controllers/channels.js'

export { router }

const router = Router()

router.get('/', isLoggedIn, (req, res, next) => {
    res.render('channels')
})
// router.get('/', isLoggedIn, channelCtrl.chatRoom)

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.redirect('/auth/spotify')
}