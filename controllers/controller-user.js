import User from '../models/User-model.js'

export const getAllUsers = async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        data: users
    })
}

export const userSingle = async (req, res, next) => {
    const {id} = req.params
    const user = await User.findById(id)

    res.status(200).json({
        success: true,
        data: user
    })
}
