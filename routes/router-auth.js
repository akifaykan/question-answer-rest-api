import express from "express"
import {
    logout,
    getUser,
    register,
    login,
    imgUpload,
    forgotPassword,
    resetPassword,
    editUser
} from "../controllers/controller-auth.js"
import {userAccess} from "../middlewares/middleware-access.js"
import {upload} from "../middlewares/middleware-uploads.js"

const router = express.Router()

const middleWares = [userAccess, upload]

router.get("/logout", middleWares[0], logout)
router.get("/profile", middleWares[0], getUser)
router.post("/register", register)
router.post("/login", login)
router.post("/upload", middleWares, imgUpload)
router.post("/forgotpassword", forgotPassword)
router.put("/resetpassword", resetPassword)
router.put("/edit", middleWares[0], editUser)

export default router
