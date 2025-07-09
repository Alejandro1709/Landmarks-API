import { Router } from 'express'
import {
  createLandmark,
  getLandmark,
  getLandmarks,
  uploadLandmarkImage,
} from '../controllers/landmarkController'

const router = Router()

router.get('/', getLandmarks)

router.get('/:id', getLandmark)

router.post('/', createLandmark)

router.post('/:id/image', uploadLandmarkImage)

export default router
