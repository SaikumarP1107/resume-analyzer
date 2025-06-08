import express from 'express';
import multer from 'multer';
import { scoreResume } from '../services/openaiScorer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const file = req.file;
    const { jobDescription } = req.body;

    if (!file) {
      res.status(400).json({ error: 'Resume file is required' });
      return;
    }
    if (!jobDescription) {
      res.status(400).json({ error: 'Job description is required' });
      return;
    }

    const scoreData = await scoreResume(file.path, file.mimetype, jobDescription);
    // Optionally: clean up uploaded file here with fs.unlink()

    res.json(scoreData);
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
