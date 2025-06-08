import express from 'express';
import multer from 'multer';
import { scoreResume } from '../services/openaiScorer';
import { extractText } from '../services/extractText';
import { cleanUpFile } from '../utils/cleanUp';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('resume'), async (req, res): Promise<void> => {
  const file = req.file;
  const jobDescription = req.body.jobDescription;

  if (!file || !jobDescription) {
    res.status(400).json({ error: 'Resume and job description required.' });
    return;
  }

  try {
    const resumeText = await extractText(file.path, file.mimetype);
    const result = await scoreResume(resumeText, jobDescription);
    cleanUpFile(file.path);
    res.json(result);
  } catch (err) {
    console.error(err);
    cleanUpFile(file.path);
    res.status(500).json({ error: 'Failed to process resume.' });
  }
});

export default router;
