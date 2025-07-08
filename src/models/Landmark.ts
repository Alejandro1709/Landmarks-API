import mongoose, { Schema, Document } from 'mongoose'

export interface ILandmark extends Document {
  title: string
  latitude: number
  longitude: number
}

const landmarkSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
  },
  {
    timestamps: true,
  }
)

const Landmark = mongoose.model<ILandmark>('Landmark', landmarkSchema)

export default Landmark
