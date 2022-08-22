import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import Question from "./Question-model.js";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Lütfen kullanıcı adınızı girin"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "E-posta adresi gerekli"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Lütfen geçerli bir e-posta adresi girin"
        ]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        minLength: [6, "Şifre en az 6 karakter uzunluğunda olmalıdır"],
        required: [true, "Lütfen bir şifre girin"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: String,
    about: String,
    city: String,
    website: String,
    profile_img: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    },
    resetToken: String,
    resetTokenExpire: Date
})

// Reset Password User
UserSchema.methods.resetPasswordToken = function (){
    const randomHex = crypto.randomBytes(15).toString("hex")
    const resetPassToken = crypto
        .createHash("SHA256")
        .update(randomHex)
        .digest("hex")

    this.resetToken = resetPassToken
    this.resetTokenExpire = Date.now() + parseInt(process.env.RESET_PASS_EXPIRE)

    return resetPassToken
}

// Generate Json Web Token
UserSchema.methods.generateJwtFromUser = function(){
    const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env
    const payload = {
        id: this._id,
        name: this.name
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    })
    return token
}

// Password hashing middlewares
UserSchema.pre("save", function(next){
    if (!this.isModified("password")) next()
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err)
            this.password = hash
            next()
        })
    })
})

// When a user deleted, the questions are deleted.
/*UserSchema.post("remove", async function(){
    await Question.deleteMany({
        user: this._id
    })
})*/

export default mongoose.model("User", UserSchema)
