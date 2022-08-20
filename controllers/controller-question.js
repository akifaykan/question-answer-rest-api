import Question from "../models/Question-model.js"
import {CustomError} from "../helpers/helper-errors.js"

export const getAllQuestions = async (req, res, next) =>{
    const questions = await Question.find()

    res.status(200).json({
        success: true,
        data: questions
    })
}

export const getQuestion = async (req, res, next) =>{
    const {id} = req.params
    const question = await Question.findById(id)

    res.status(200).json({
        success: true,
        data: question
    })
}

export const newQuestion = async (req, res, next) =>{
    const data = req.body

    const question = await Question.create({
        ...data,
        user: req.user.id
    })

    res.status(200).json({
        success: true,
        data: question
    })
}

export const editQuestion = async (req, res, next) =>{
    const {id} = req.params
    const {title, content} = req.body
    let question = await Question.findById(id)

    question.title = title
    question.content = content

    question = await question.save()

    res.status(200).json({
        success: true,
        data: question
    })
}

export const deleteQuestion = async (req, res, next) =>{
    const {id} = req.params

    await Question.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        message: 'Soru başarıyla silindi!'
    })
}
