import express from "express"
import {getAllUsers, userSingle} from "../controllers/controller-user.js"
import {userExist} from "../middlewares/middleware-exist.js"

const router = express.Router()

router.get("/", getAllUsers)
router.get("/:id", userExist, userSingle)

export default router
