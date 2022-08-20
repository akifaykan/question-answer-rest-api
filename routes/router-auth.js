import express from 'express'
import eah from 'express-async-handler'
import {
    logout,
    getUser,
    register,
    login,
    imgUpload,
    forgotPassword,
    resetPassword,
    editUser
} from '../controllers/controller-auth.js'
import {userAccess} from '../middlewares/middleware-access.js'
import {upload} from '../middlewares/middleware-uploads.js'

const router = express.Router()

router.get('/logout', userAccess, eah(logout))
router.get('/profile', userAccess, getUser)
router.post('/register', eah(register))
router.post('/login', eah(login))
router.post('/upload', [userAccess, upload], eah(imgUpload))
router.post('/forgotpassword', eah(forgotPassword))
router.put('/resetpassword', eah(resetPassword))
router.put('/edit', userAccess, eah(editUser))

export default router
