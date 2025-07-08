import { Router } from 'express'
import { getLandmarks } from '../controllers/landmarkController'

const router = Router()

router.get('/', getLandmarks)

export default router
