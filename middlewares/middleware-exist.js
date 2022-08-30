import User from "../models/User-model.js"
import eah from "express-async-handler"
import Question from "../models/Question-model.js"
import {CustomError} from "../helpers/helper-errors.js"

export const userExist = eah(async (req, res, next)=>{
    const {id} = req.params
    const user = await User.findById(id)

    if (!user){
        return next(new CustomError("Kullanıcı bulunamadı!", 400))
    }

    next()
})

export const questionExist = eah(async (req, res, next)=>{
    const question_id = req.params.id || req.params.question_id

    const question = await Question.findById(question_id)

    if (!question){
        return next(new CustomError("Soru bulunamadı!", 400))
    }

    next()
})
