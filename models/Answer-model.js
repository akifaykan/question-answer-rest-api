import mongoose from "mongoose"

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

export default mongoose.model("Answer", AnswerSchema)
