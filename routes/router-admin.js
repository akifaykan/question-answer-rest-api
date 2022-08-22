import express from "express"
import {userAccess, adminAccess} from "../middlewares/middleware-access.js"
import {adminDashboard, blockUser, deleteUser} from "../controllers/controller-admin.js"
import {userExist} from "../middlewares/middleware-exist.js"

const router = express.Router()

router.use([userAccess, adminAccess])

router.get("/", adminDashboard)
router.get("/block/:id", userExist, blockUser)
router.delete("/user/:id", userExist, deleteUser)

export default router
