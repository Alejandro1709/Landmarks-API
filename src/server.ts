import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import cors from 'cors'
import landmarkRoutes from './routes/landmarkRoutes'
import { globalErrorMiddleware } from './middlewares/error'
import AppError from './utils/AppError'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Routes
app.use('/api/v1/landmarks', landmarkRoutes)

// Error middlewares
app.use((req, res, next) => {
  return next(new AppError('This route does not exists', 404))
})

app.use(globalErrorMiddleware)

export default app
