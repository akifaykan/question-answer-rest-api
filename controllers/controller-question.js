import Question from "../models/Question-model.js"
import eah from "express-async-handler"
import {CustomError} from "../helpers/helper-errors.js"

export const getAllQuestions = eah(async (req, res, next) =>{
    let query = Question.find()
    const populate = true
    const populateObject = {
        path: "user",
        select: "name profile_img"
    }

    if (req.query.search){
        const searchObject = {}

        const regex = new RegExp(req.query.search, "i")
        searchObject["title"] = regex

        query = query.where(searchObject)
    }

    if (populate){
        query = query.populate(populateObject)
    }

    const questions = await query

    res.status(200).json({
        success: true,
        data: questions
    })
})

export const getQuestion = eah(async (req, res, next) =>{
    const {id} = req.params
    const question = await Question.findById(id)

    res.status(200).json({
        success: true,
        data: question
    })
})

export const newQuestion = eah(async (req, res, next) =>{
    const data = req.body

    const question = await Question.create({
        ...data,
        user: req.user.id
    })

    res.status(200).json({
        success: true,
        data: question
    })
})

export const editQuestion = eah(async (req, res, next) =>{
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
})

export const deleteQuestion = eah(async (req, res, next) =>{
    const {id} = req.params

    await Question.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        message: "Soru başarıyla silindi!"
    })
})

export const likeQuestion = eah(async (req, res, next) => {
    const {id} = req.params
    const question = await Question.findById(id)

    if (question.likes.includes(req.user.id)){
        return next(new CustomError("Bu soruyu zaten beğendiniz", 400))
    }

    question.likes.push(req.user.id)

    await question.save()

    res.status(200).json({
        success: true,
        data: question
    })
})

export const unlikeQuestion = eah(async (req, res, next) => {
    const {id} = req.params
    const question = await Question.findById(id)

    if (!question.likes.includes(req.user.id)){
        return next(new CustomError("Bu soruyu henüz beğenmediniz", 400))
    }

    const index = question.likes.indexOf(req.user.id)
    question.likes.splice(index, 1)

    await question.save()

    res.status(200).json({
        success: true,
        data: question
    })
})
