import fs from 'fs';

export function cleanUpFile(filePath: string): void {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    console.warn('Failed to delete file:', filePath);
  }
}
