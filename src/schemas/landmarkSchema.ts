import { z } from 'zod'

export const createLandmarkSchema = z.object({
  title: z.string().min(1, 'The title is required'),
  latitude: z.number(),
  longitude: z.number(),
})

export type CreateLandmark = z.infer<typeof createLandmarkSchema>
