import express from "express"
import {answerAccess, userAccess} from "../middlewares/middleware-access.js"
import {
    addNewAnswerToQuestion,
    getAllAnswersByQuestion,
    getSingleAnswer,
    editAnswer,
    deleteAnswer,
    likeAnswer,
    unLikeAnswer
} from "../controllers/controller-answer.js"
import {questionAndAnswerExist} from "../middlewares/middleware-exist.js"

const router = express.Router({ mergeParams: true })

const middlewares1 = [questionAndAnswerExist, userAccess, answerAccess]
const middlewares2 = [questionAndAnswerExist, userAccess]

router.post("/", middlewares1[1], addNewAnswerToQuestion)
router.get("/", getAllAnswersByQuestion)
router.get("/:answer_id", middlewares1[0], getSingleAnswer)
router.put("/:answer_id/edit", middlewares1, editAnswer)
router.get("/:answer_id/like", middlewares2, likeAnswer)
router.get("/:answer_id/unlike", middlewares2, unLikeAnswer)
router.delete("/:answer_id/delete", middlewares1, deleteAnswer)

export default router
