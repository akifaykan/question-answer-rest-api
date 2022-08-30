import Answer from "../models/Answer-model.js"
import Question from "../models/Question-model.js"
import eah from "express-async-handler"
import {CustomError} from "../helpers/helper-errors.js"


export const addNewAnswerToQuestion = eah(async (req, res, next) => {
    const {question_id} = req.params
    const user_id = req.user.id
    const information = req.body

    const answer = await Answer.create({
        ...information,
        question: question_id,
        user: user_id
    })

    return res.status(200).json({
        success: true,
        data: answer
    })
})
