import express from 'express'
import eah from 'express-async-handler'
import {getAllUsers, userSingle} from '../controllers/controller-user.js'
import {userExist} from "../middlewares/middleware-exist.js"

const router = express.Router()

router.get('/', eah(getAllUsers))
router.get('/:id', eah(userExist), eah(userSingle))

export default router
