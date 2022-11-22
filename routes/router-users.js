import express from "express"
import User from "../models/User-model.js"
import {getAllUsers, userSingle} from "../controllers/controller-user.js"
import {userExist} from "../middlewares/middleware-exist.js"
import {userQuery} from "../middlewares/middleware-query-user.js"

const router = express.Router()

router.get("/", userQuery(User), getAllUsers)
router.get("/:id", userExist, userSingle)

export default router
