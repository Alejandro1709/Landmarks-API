import type { Request, Response, NextFunction } from 'express'
import { createLandmarkSchema } from '../schemas/landmarkSchema'
import formidable from 'formidable'
import cloudinary from '../config/cloudinary'
import { v4 as uuid } from 'uuid'
import Landmark from '../models/Landmark'
import AppError from '../utils/AppError'

export const getLandmarks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const landmarks = await Landmark.find()

    res.status(200).json(landmarks)
  } catch (error) {
    next(error)
  }
}

export const getLandmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const landmark = await Landmark.findById(req.params.id)

    if (!landmark) {
      return next(new AppError('This landmark does not exists', 404))
    }

    res.status(200).json(landmark)
  } catch (error) {
    next(error)
  }
}

export const createLandmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = createLandmarkSchema.parse(req.body)

    const landmark = new Landmark(body)

    await landmark.save()

    res.status(201).json({ message: 'Landmark created 🌏' })
  } catch (error) {
    next(error)
  }
}

export const uploadLandmarkImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const form = formidable({ multiples: false })

    form.parse(req, (error, fields, files) => {
      cloudinary.uploader.upload(
        files.file[0].filepath,
        { public_id: uuid() },
        async function (error, result) {
          if (error) {
            return next(new AppError('There was an unexpected error', 500))
          }

          if (result) {
            const landmark = await Landmark.findById(req.params.id)

            landmark.image = result.secure_url

            if (!landmark) {
              return next(new AppError('This Landmark does not exists', 404))
            }

            await landmark.save()

            res.status(200).json({ image: result.secure_url })
          }
        }
      )
    })
  } catch (error) {
    next(error)
  }
}
