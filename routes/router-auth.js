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

router.get("/logout", userAccess, logout)
router.get("/profile", userAccess, getUser)
router.post("/register", register)
router.post("/login", login)
router.post("/upload", [userAccess, upload], imgUpload)
router.post("/forgotpassword", forgotPassword)
router.put("/resetpassword", resetPassword)
router.put("/edit", userAccess, editUser)

export default router
