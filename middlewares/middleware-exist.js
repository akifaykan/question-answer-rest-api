import User from '../models/User-model.js'
import Question from "../models/Question-model.js"
import {CustomError} from "../helpers/helper-errors.js"

export const userExist = async (req, res, next)=>{
    const {id} = req.params
    const user = await User.findById(id)

    if (!user){
        return next(new CustomError('Kullanıcı bulunamadı!', 400))
    }

    next()
}

export const questionExist = async (req, res, next)=>{
    const {id} = req.params
    const question = await Question.findById(id)

    if (!question){
        return next(new CustomError('Soru bulunamadı!', 400))
    }

    next()
}
