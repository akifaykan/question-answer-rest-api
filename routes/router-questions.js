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

router.get("/", getAllQuestions)
router.get("/:id", questionExist, getQuestion)
router.get("/:id/like", [userAccess, questionExist], likeQuestion)
router.get("/:id/unlike", [userAccess, questionExist], unlikeQuestion)
router.post("/ask", userAccess, newQuestion)
router.put("/:id/edit", [userAccess,questionExist,questionAccess], editQuestion)
router.delete("/:id/delete", [userAccess,questionExist,questionAccess], deleteQuestion)

// Answers Router
router.use("/:question_id/answers", questionExist, answer)

export default router
