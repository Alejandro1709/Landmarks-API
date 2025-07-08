import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import { globalErrorMiddleware } from './middlewares/error'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Routes

// Error middlewares
app.use((req, res, next) => {
  res.status(404).json({ message: 'This route does not exists' })
})

app.use(globalErrorMiddleware)

export default app
