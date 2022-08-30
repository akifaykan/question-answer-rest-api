import mongoose from "mongoose"
import Question from "./Question-model.js"

const AnswerSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Lütfen cevap içeriği girin"],
        minlength: [10, "Minimum 10 karakter girmelisiniz."]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    question: [
        {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Question"
        }
    ],
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ]
})

AnswerSchema.pre("save", async function(next){
    if (!this.isModified("user")) return next()

    try {
        const question = await Question.findById(this.question)

        question.answers.push(this._id)

        await question.save()

        next()
    } catch (err) {
        return next(err)
    }
})

export default mongoose.model("Answer", AnswerSchema)
