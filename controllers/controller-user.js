import User from "../models/User-model.js"
import eah from "express-async-handler"

export const getAllUsers = eah(async (req, res, next) => {
    return res.status(200).json(res.queryResults)
})

export const userSingle = eah(async (req, res, next) => {
    const {id} = req.params
    const user = await User.findById(id)

    res.status(200).json({
        success: true,
        data: user
    })
})
