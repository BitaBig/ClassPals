import mongoose, { Schema, Document } from 'mongoose';

// User interface for TypeScript
export interface IUser extends Document {
  firebaseUid: string;
  email: string;
  university: string;
  program?: string;
  year?: number;
  createdAt: Date;
  updatedAt: Date;
}

// User schema
const UserSchema: Schema = new Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    university: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    program: {
      type: String,
      required: false,
      trim: true,
    },
    year: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export default mongoose.model<IUser>('User', UserSchema);
