import express from 'express'
import eah from "express-async-handler"
import {
    getAllQuestions,
    getQuestion,
    newQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    unlikeQuestion
} from '../controllers/controller-question.js'
import {userAccess, questionAccess} from "../middlewares/middleware-access.js"
import {questionExist} from "../middlewares/middleware-exist.js"

const router = express.Router()

router.get('/', eah(getAllQuestions))
router.get('/:id', eah(questionExist), eah(getQuestion))
router.get('/:id/like', [userAccess, eah(questionExist)], eah(likeQuestion))
router.get('/:id/unlike', [userAccess, eah(questionExist)], eah(unlikeQuestion))
router.post('/ask', userAccess, eah(newQuestion))

router.put('/:id/edit', [
    userAccess,
    eah(questionExist),
    eah(questionAccess)
], eah(editQuestion))

router.delete('/:id/delete', [
    userAccess,
    eah(questionExist),
    eah(questionAccess)
], eah(deleteQuestion))

export default router
