import User, { IUser } from '../models/User';

/**
 * Get or create a user in MongoDB based on Firebase UID
 * @param firebaseUid - Firebase user UID
 * @param email - User email from Firebase
 * @returns User document from MongoDB
 */
export const getOrCreateUser = async (
  firebaseUid: string,
  email: string
): Promise<IUser> => {
  // Find existing user by Firebase UID
  let user = await User.findOne({ firebaseUid });

  if (!user) {
    // Create new user if doesn't exist
    // Note: university is required, so we'll create with a placeholder
    // The user should update their profile with actual university info later
    user = await User.create({
      firebaseUid,
      email,
      university: '', // Placeholder - user should update this
    });
  }

  return user;
};

