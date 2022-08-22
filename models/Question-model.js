import mongoose from 'mongoose'
import slugify from 'slugify'

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Lütfen bir başlık girin'],
        minlength: [10, 'Başlık 10 karakter uzunluğunda olmalıdır!'],
        unique: true
    },
    content: {
        type: String,
        required: [true, 'Lütfen içerik girin'],
        minlength: [20, 'İçerik 20 karakter uzunluğunda olmalıdır!']
    },
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]
})

QuestionSchema.pre('save', function(next){
    if (!this.isModified('title')) next()
    this.slug = this.makeSlug()
    next()
})

QuestionSchema.methods.makeSlug = function(){
    return slugify(this.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: false
    })
}

export default mongoose.model('Question', QuestionSchema)
