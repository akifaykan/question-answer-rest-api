import express from "express"
import {userAccess} from "../middlewares/middleware-access.js"
import {addNewAnswerToQuestion} from "../controllers/controller-answer.js"

const router = express.Router({ mergeParams: true })

router.post("/", userAccess, addNewAnswerToQuestion)

/*router.get("/", (req, res, next) =>{
    console.log(req.params)
    res.send("Router Answer")
})*/

export default router
