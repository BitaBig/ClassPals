import mongoose, { Schema, Document } from 'mongoose';

// Course interface for TypeScript
export interface ICourse extends Document {
  university: string;
  courseCode: string;
  courseName: string;
  professor?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Course schema
const CourseSchema: Schema = new Schema(
  {
    university: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    courseCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    professor: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for unique course per university
CourseSchema.index({ university: 1, courseCode: 1 }, { unique: true });

// Export the model
export default mongoose.model<ICourse>('Course', CourseSchema);
