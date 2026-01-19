import mongoose, { Schema, Document, Types } from 'mongoose';

// Post interface for TypeScript
export interface IPost extends Document {
  author: Types.ObjectId;
  course: Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Post schema
const PostSchema: Schema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
PostSchema.index({ course: 1, createdAt: -1 });

// Export the model
export default mongoose.model<IPost>('Post', PostSchema);
