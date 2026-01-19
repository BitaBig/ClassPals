import mongoose, { Schema, Document } from 'mongoose';

// User interface for TypeScript
export interface IUser extends Document {
  firebaseUid: string;
  email: string;
  name: string;
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

// Export the model
export default mongoose.model<IUser>('User', UserSchema);
