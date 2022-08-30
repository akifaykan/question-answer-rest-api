import express from "express"
import {userAccess} from "../middlewares/middleware-access.js"
import {
    addNewAnswerToQuestion,
    getAllAnswersByQuestion,
    getSingleAnswer
} from "../controllers/controller-answer.js"
import {questionAndAnswerExist} from "../middlewares/middleware-exist.js"

const router = express.Router({ mergeParams: true })

router.post("/", userAccess, addNewAnswerToQuestion)
router.get("/", getAllAnswersByQuestion)
router.get("/:answer_id", questionAndAnswerExist, getSingleAnswer)

export default router
