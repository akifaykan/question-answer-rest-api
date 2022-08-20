import { CustomError } from '../helpers/helper-errors.js'

export const customErrorHandler = (err, req, res, next) => {
    let customError = err

    if ( err.name === 'SyntaxError'){
        customError = new CustomError('Beklenmedik bir hata!', 400)
    }
    if ( err.name === 'ValidationError' ){
        customError = new CustomError(err.message, 400)
    }
    if ( err.name === 'TypeError' ){
        customError = new CustomError('Bilgileriniz hatalı!', 400)
    }
    if ( err.name === 'CastError' ){
        customError = new CustomError('Aradığınız Id Bulunamadı!', 400)
    }
    if (err.code === 11000){
        customError = new CustomError('Duplicate key found: Bilgilerizi kontrol edin', 400)
    }

    res.status(customError.status || 500).json({
        success: false,
        message: customError.message,
        errorname: err.name
    })
}
