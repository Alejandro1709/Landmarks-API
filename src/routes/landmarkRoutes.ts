import { Router } from 'express'
import { createLandmark, getLandmarks } from '../controllers/landmarkController'

const router = Router()

router.get('/', getLandmarks)

router.post('/', createLandmark)

export default router
