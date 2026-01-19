import { Router, Request, Response } from 'express';
import Course, { ICourse } from '../models/Course';
import mongoose from 'mongoose';

const router = Router();

// Search courses
// GET /api/courses/search?university=...&courseCode=...&courseName=...&professor=...
router.get('/search', async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      res.status(503).json({ 
        error: 'Database not connected',
        message: 'MongoDB connection is not available. Please check your database connection.'
      });
      return;
    }

    const { university, courseCode, courseName, professor } = req.query;

    // Build search filter
    const filter: any = {};

    if (university) {
      filter.university = { $regex: university as string, $options: 'i' };
    }

    if (courseCode) {
      filter.courseCode = { $regex: courseCode as string, $options: 'i' };
    }

    if (courseName) {
      filter.courseName = { $regex: courseName as string, $options: 'i' };
    }

    if (professor) {
      filter.professor = { $regex: professor as string, $options: 'i' };
    }

    // Execute search
    const courses = await Course.find(filter).sort({ createdAt: -1 });

    res.json({
      count: courses.length,
      courses,
    });
  } catch (error: any) {
    console.error('Error searching courses:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Get course by ID
// GET /api/courses/:courseId
router.get('/:courseId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      res.status(400).json({ error: 'Invalid course ID format' });
      return;
    }

    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Course routes - to be implemented
// POST /api/courses/:courseId/join - Join a course

export default router;
