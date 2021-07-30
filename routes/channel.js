import { Router } from 'express'
import * as channelCtrl from '../controllers/channel.js'

export { router }

const router = Router()

router.get('/:channel', isLoggedIn, channelCtrl.chatRoom)
router.post('/:channel', isLoggedIn, channelCtrl.postChat)
router.get('/remove/:channel/:id', isLoggedIn, channelCtrl.removeMessage)

// router.get('/:id', function(req, res, next) {
//     console.log("CHANNEL USER:")
//     console.log("============================")
//     console.log("============================")
//     console.log("============================")
//     console.log("============================")
//     console.log("============================")
//     console.log(req.user)
//     res.render('channel')
// })

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.redirect('/auth/google')
}