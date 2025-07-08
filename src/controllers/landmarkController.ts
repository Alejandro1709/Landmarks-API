import type { Request, Response, NextFunction } from 'express'
import { createLandmarkSchema } from '../schemas/landmarkSchema'
import Landmark from '../models/Landmark'

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
      res.status(404).json({ message: 'Landmark not found' })
      return
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
    const body = createLandmarkSchema.safeParse(req.body)

    if (!body.success) {
      res.status(400).json({ errors: body.error.format() })
      return
    }

    const landmark = new Landmark(body.data)

    await landmark.save()

    res.status(201).json({ message: 'Landmark created 🌏' })
  } catch (error) {
    next(error)
  }
}
