import type { Request, Response, NextFunction } from 'express'
import Landmark from '../models/Landmark'
import AppError from '../utils/AppError'
import formidable from 'formidable'
import cloudinary from '../config/cloudinary'

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
  const form = formidable({ multiples: false })

  form.parse(req, async (err, fields, files) => {
    if (err) return next(new AppError('Error while processing form', 500))

    try {
      const file = files.image[0]

      if (!file || !file.filepath) {
        return res
          .status(400)
          .json({ message: 'No se proporcionó ninguna imagen' })
      }

      const uploadResult = await cloudinary.uploader.upload(file.filepath, {
        folder: 'landmarks',
      })

      const newLandmark = new Landmark({
        title: fields.title[0],
        latitude: +fields.latitude[0],
        longitude: +fields.longitude[0],
        image: uploadResult.secure_url,
      })

      await newLandmark.save()

      return res.status(201).json({ message: 'Landmark created' })
    } catch (error) {
      return res.status(500).json({ message: 'Error creating landmark', error })
    }
  })
}
