import express from 'express'
import questions from './router-questions.js'
import auth from './router-auth.js'
import users from './router-users.js'
import admin from './router-admin.js'

const router = express.Router()

router.use('/question', questions)
router.use('/auth', auth)
router.use('/users', users)
router.use('/admin', admin)

export default router
