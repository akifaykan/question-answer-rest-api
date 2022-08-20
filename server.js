import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routes from './routes/router-main.js'
import {customErrorHandler} from './middlewares/middleware-errors.js'

const app = express()

// dotenv config path
dotenv.config({ path: './config.env' })

// Express body json
app.use(express.json())

// Routes
app.use('/api', routes)

// Custom Error Handler
app.use(customErrorHandler)

// Static path
app.use(express.static("/public"))

// Mongoose Connect
const {MONGO_URI, PORT, NODE_ENV} = process.env
mongoose.connect(MONGO_URI)
    .then(()=>{
        console.log(`connected mongodb : PORT/${PORT} - ${NODE_ENV}`)
        app.listen(PORT)
    })
    .catch(err => console.log(err))
