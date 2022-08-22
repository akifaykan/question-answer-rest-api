import User from "../models/User-model.js"
import eah from "express-async-handler"
import {CustomError} from "../helpers/helper-errors.js"
import {sendJwtToClient} from "../helpers/helper-token.js"
import {validateUserInput, comparePassword} from "../helpers/helper-input.js"
import {sendEMail} from "../helpers/helper-mail.js"

export const register = eah(async (req, res, next) => {
    const { name, email, password, role } = req.body

    const user = await User.create({
        name,
        email,
        password,
        role
    })

    sendJwtToClient(user, res)
})

export const login = eah(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select("+password")

    if (!validateUserInput(email, password) || !comparePassword(password, user.password)){
        return next(new CustomError("Girdiğiniz bilgileri kontrol edin!", 400))
    }

    sendJwtToClient(user, res)
})

export const logout = eah(async (req, res, next) => {
    return res
        .status(200)
        .cookie({
            httpOnly: true,
            expires: new Date(Date.now()),
            secure: process.env.NODE_ENV === "development" ? false : true
        })
        .json({
            success: true,
            message: "Başarıyla çıkış yaptınız"
        })
})

export const getUser = (req, res, next) => {
    res.json({
        success: true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    })
}

export const imgUpload = eah(async (req, res, next) => {
    const imageSaved = {
        "profile_img": req.savedProfileImg
    }

    const user = await User.findByIdAndUpdate(req.user.id, imageSaved, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: "Image Upload Successfull",
        data: user
    })
})

export const forgotPassword = eah(async (req, res, next) => {
    const resetEmail = req.body.email
    const user = await User.findOne({ email: resetEmail })

    if (!user) {
        return next(new CustomError("Bu maile kayıtlı kullanıcı bulunamadı"), 400)
    }

    const resetToken = user.resetPasswordToken()

    await user.save()

    // Mail settings
    const resetUrl = `http://localhost:5000/api/auth/resetpassword?resettoken=${resetToken}`
    try {
        await sendEMail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Parola sıfırlama",
            html: `
                <p>Parolanızı güncellemek için aşağıdaki bağlantıya tıklayın</p>
                <p><a href="${resetUrl}" target="_blank">Parolayı resetle</a></p>
            `
        })

        return res.status(200).json({
            success: true,
            message: "Token E-postanıza Gönderildi"
        })
    } catch (err) {
        user.resetToken = undefined
        user.resetTokenExpire = undefined

        await user.save()

        return next(new CustomError("E-mail gönderilirken hata oluştu!"), 500)
    }
})

export const resetPassword = eah(async (req, res, next) => {
    const {resettoken} = req.query
    const {password} = req.body

    if (!resettoken){
        return next(new CustomError("Lütfen geçerli bir token sağlayın!", 400))
    }

    let user = await User.findOne({
        resetToken: resettoken,
        resetTokenExpire: {$gt: Date.now()}
    })

    if (!user){
        return next(new CustomError("Geçersiz kullanıcı veya geçersiz token", 400))
    }

    user.password = password
    user.resetToken = undefined
    user.resetTokenExpire = undefined

    await user.save()

    res.json({
        success: true,
        message: "Parolanız başarıyla güncellendi"
    })
})

export const editUser = eah(async (req, res, next) => {
    const editUserInformation = req.body

    const user = await User.findByIdAndUpdate(req.user.id, editUserInformation, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: "Bilgiler Güncellendi!",
        data: user
    })
})
