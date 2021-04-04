import { promises as fs } from 'fs';

export async function readFile(path: string): Promise<string | null> {
  try {
    const content = await fs.readFile(path);
    return content.toString();
  } catch {
    return null;
  }
}
