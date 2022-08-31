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

export const getAllAnswersByQuestion = eah(async (req, res, next) => {
    const {question_id} = req.params
    const question = await Question
        .findById(question_id)
        .populate("answers")
    const answers = question.answers

    return res.status(200).json({
        success: true,
        count: answers.length,
        data: answers
    })
})

export const getSingleAnswer = eah(async (req, res, next) => {
    const {answer_id} = req.params
    const answer = await Answer.findById(answer_id)
        .populate({
            path: "question",
            select: "title"
        })
        .populate({
            path: "user",
            select: "name profile_img"
        })

    res.status(200).json({
        success: true,
        data: answer
    })
})

export const editAnswer = eah(async (req, res, next) => {
    const {answer_id} = req.params
    const {content} = req.body

    let answer = await Answer.findById(answer_id)

    answer.content = content

    await answer.save()

    res.status(200).json({
        success: true,
        data: answer
    })
})

export const deleteAnswer = eah(async (req, res, next) => {
    const {answer_id, question_id} = req.params

    await Answer.findByIdAndRemove(answer_id)

    const question = await Question.findById(question_id)

    question.answers.splice(question.answers.indexOf(answer_id), 1)

    await question.save()

    return res.status(200).json({
        success: true,
        message: "Cevap başarıyla silindi"
    })
})
