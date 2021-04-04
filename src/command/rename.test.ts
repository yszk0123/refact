import { promises as fs } from 'fs';
import mock from 'mock-fs';
import { rename } from './rename';
import { getLazyLoadedNodeModules } from '../test-helper/getLazyLoadedNodeModules';

type EntryInner = { [key: string]: Entry } | string;

type Entry = {
  [key: string]: EntryInner;
};

afterEach(() => {
  mock.restore();
});

it('should rename ts files', async () => {
  mock({ ...getLazyLoadedNodeModules(), 'a.ts': 'a', 'b.ts': 'b' });

  await rename({ from: 'a.ts', to: 'c.ts' });

  expect(await readFile('a.ts')).toBe(null);
  expect(await readFile('b.ts')).toBe('b');
  expect(await readFile('c.ts')).toBe('a');
});

it('should rename directories with ts files', async () => {
  mock({
    ...getLazyLoadedNodeModules(),
    'dir1/a.ts': 'export const a = 1;',
    'dir2/b.ts': `import { a } from '../dir1/a';`,
  });

  await rename({ from: 'dir1', to: './dir3' });

  expect(await readFile('dir1/a.ts')).toBe(null);
  expect(await readFile('dir2/b.ts')).toBe(`import { a } from '../dir3/a';`);
  expect(await readFile('dir3/a.ts')).toBe('export const a = 1;');
});

async function readFile(path: string): Promise<string | null> {
  try {
    const content = await fs.readFile(path);
    return content.toString();
  } catch {
    return null;
  }
}
