import multer from 'multer'
import path from 'path'
import { CustomError } from '../helpers/helper-errors.js'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb){
        req.savedProfileImg = 'profile_' + req.user.id + path.extname(file.originalname)
        cb(null, req.savedProfileImg)
    }
})

const filter = (req, file, cb) => {
    let allowedMimeTypes = ['image/jpg','image/gif','image/jpeg','image/png']
    if (!allowedMimeTypes.includes(file.mimetype)){
        return cb(new CustomError('Lütfen izin verilen formatta resim yükleyin!', 400), false)
    }
    return cb(null, true)
}

export const upload = multer({ storage, filter }).single('profile_img')
