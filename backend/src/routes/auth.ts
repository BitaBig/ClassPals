import { Router, Request, Response } from 'express';
import { authenticateFirebase } from '../middleware/auth';
import { getOrCreateUser } from '../utils/user';

const router = Router();

// Get or create user profile
router.get('/me', authenticateFirebase, async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { uid, email } = req.user;

    if (!email) {
      res.status(400).json({ error: 'Email not found in token' });
      return;
    }

    // Get or create user in MongoDB
    const user = await getOrCreateUser(uid, email);

    res.json(user);
  } catch (error) {
    console.error('Error in /me route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
