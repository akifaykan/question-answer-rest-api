import express from "express"
import {answerAccess, userAccess} from "../middlewares/middleware-access.js"
import {
    addNewAnswerToQuestion,
    getAllAnswersByQuestion,
    getSingleAnswer,
    editAnswer,
    deleteAnswer
} from "../controllers/controller-answer.js"
import {questionAndAnswerExist} from "../middlewares/middleware-exist.js"

const router = express.Router({ mergeParams: true })

const middlewares = [questionAndAnswerExist, userAccess, answerAccess]

router.post("/", middlewares[1], addNewAnswerToQuestion)
router.get("/", getAllAnswersByQuestion)
router.get("/:answer_id", middlewares[0], getSingleAnswer)
router.put("/:answer_id/edit", middlewares, editAnswer)
router.delete("/:answer_id/delete", middlewares, deleteAnswer)

export default router
