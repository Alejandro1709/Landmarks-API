import { z } from 'zod'

export const createLandmarkSchema = z.object({
  title: z.string().min(1, 'The title is required'),
  latitude: z.number().refine((val) => val >= -90 && val <= 90, {
    message: 'Invalid latitude',
  }),
  longitude: z.number().refine((val) => val >= -180 && val <= 180, {
    message: 'Invalid longitude',
  }),
})

export type CreateLandmark = z.infer<typeof createLandmarkSchema>
