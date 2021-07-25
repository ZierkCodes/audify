import { Router } from 'express'
import * as channelCtrl from '../controllers/channel.js'

export { router }

const router = Router()

router.get('/:channel', isLoggedIn, channelCtrl.chatRoom)
router.post('/:channel', isLoggedIn, channelCtrl.postChat)

router.get('/:id', function(req, res, next) {
    res.render('channel')
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.redirect('/auth/spotify')
}