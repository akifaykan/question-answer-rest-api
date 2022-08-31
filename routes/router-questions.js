import express from "express"
import answer from "./router-answer.js"
import {
    getAllQuestions,
    getQuestion,
    newQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    unlikeQuestion
} from "../controllers/controller-question.js"
import {userAccess, questionAccess} from "../middlewares/middleware-access.js"
import {questionExist} from "../middlewares/middleware-exist.js"

const router = express.Router()

const middleWares1 = [userAccess, questionExist]
const middleWares2 = [userAccess,questionExist,questionAccess]

router.get("/", getAllQuestions)
router.get("/:id", questionExist, getQuestion)
router.get("/:id/like", middleWares1, likeQuestion)
router.get("/:id/unlike", middleWares1, unlikeQuestion)
router.post("/ask", middleWares1[0], newQuestion)
router.put("/:id/edit", middleWares2, editQuestion)
router.delete("/:id/delete", middleWares2, deleteQuestion)

// Answers Router
router.use("/:question_id/answers", middleWares1[1], answer)

export default router
