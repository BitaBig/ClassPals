import mongoose, { Schema, Document } from 'mongoose';

// Course interface for TypeScript
export interface ICourse extends Document {
  universityId: string;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Course schema
const CourseSchema: Schema = new Schema(
  {
    universityId: {
      type: String,
      required: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Compound index for unique course per university
CourseSchema.index({ universityId: 1, code: 1 }, { unique: true });

// Export the model
export default mongoose.model<ICourse>('Course', CourseSchema);
