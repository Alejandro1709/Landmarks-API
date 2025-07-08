import { Router } from 'express'
import {
  createLandmark,
  getLandmark,
  getLandmarks,
} from '../controllers/landmarkController'

const router = Router()

router.get('/', getLandmarks)

router.get('/:id', getLandmark)

router.post('/', createLandmark)

export default router
