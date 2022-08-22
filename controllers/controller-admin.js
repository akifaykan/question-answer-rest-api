import User from "../models/User-model.js"
import eah from "express-async-handler"

export const adminDashboard = eah(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Admin page"
    })
})

export const blockUser = eah(async (req, res, next) => {
    const {id} = req.params
    const user = await User.findById(id)

    user.blocked = !user.blocked

    await user.save()

    res.status(200).json({
        success: true,
        message: "Kullanıcı engellendi!"
    })
})

export const deleteUser = eah(async (req, res, next) => {
    const {id} = req.params
    const user = await User.findById(id)

    await user.remove()

    res.status(200).json({
        success: true,
        message: "Kullanıcı silindi!"
    })
})
