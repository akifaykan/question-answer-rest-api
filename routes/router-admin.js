import express from 'express'
import eah from "express-async-handler"
import {userAccess, adminAccess} from '../middlewares/middleware-access.js'
import {adminDashboard, blockUser, deleteUser} from "../controllers/controller-admin.js"
import {userExist} from "../middlewares/middleware-exist.js"

const router = express.Router()

router.use([userAccess, adminAccess])

router.get('/', eah(adminDashboard))
router.get('/block/:id', eah(userExist), eah(blockUser))
router.delete('/user/:id', eah(userExist), eah(deleteUser))

export default router
