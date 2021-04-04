import { promises as fs } from 'fs';

export async function isDirectory(path: string): Promise<boolean> {
  try {
    const stats = await fs.lstat(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
}
