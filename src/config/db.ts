import mongoose from 'mongoose'
import colors from 'colors'

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI)

    const url = `${connection.host}:${connection.port}`

    console.log(colors.magenta.bold(`MongoDB Connected: ${url}`))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
