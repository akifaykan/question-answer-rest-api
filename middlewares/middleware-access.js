import jwt from "jsonwebtoken"
import eah from "express-async-handler"
import User from "../models/User-model.js"
import Question from "../models/Question-model.js"
import Answer from "../models/Answer-model.js"
import { CustomError } from "../helpers/helper-errors.js"
import { isTokenIncluded, getAccessTokenFromHeader } from "../helpers/helper-token.js"

export const userAccess = (req, res, next) => {
    if (!isTokenIncluded(req)){
        return next(new CustomError("Oturum kontrolünüz sağlanamadı", 401))
    }

    const accessToken = getAccessTokenFromHeader(req)

    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new CustomError("Oturum kontrolünüz sağlanamadı", 401))
        }

        req.user = {
            id: decoded.id,
            name: decoded.name
        }

        next()
    })
}

export const questionAccess = eah(async (req, res, next) => {
    const userId = req.user.id
    const questionId = req.params.id
    const question = await Question.findById(questionId)

    if (question.user != userId){
        return next(new CustomError("Bu soruyu düzenleyemezsiniz!", 403))
    }

    next()
})

export const answerAccess = eah(async (req, res, next) => {
    const userId = req.user.id
    const answerId = req.params.answer_id

    const answer = await Answer.findById(answerId)

    if (answer.user != userId){
        return next(new CustomError("Bu cevabı düzenleyemezsiniz!", 403))
    }

    next()
})

export const adminAccess = eah(async (req, res, next) => {
    const {id} = req.user
    const user = await User.findById(id)

    if (user.role !== "admin"){
        return next(new CustomError("Bu alana sadece admin erişebilir!", 403))
    }

    next()
})
