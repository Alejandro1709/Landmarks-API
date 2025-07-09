import { CorsOptions } from 'cors'
import dotenv from 'dotenv'

dotenv.config()

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whitelist = [
      'https://landmarks-front-frsus5art-alejandro1709s-projects.vercel.app',
    ]

    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('CORS Error'))
    }
  },
}
