import mock from 'mock-fs';
import { getLazyLoadedNodeModules } from '../test-helper/getLazyLoadedNodeModules';
import { isDirectory } from '../helper/isDirectory';
import { readFile } from '../helper/readFile';
import { renameComponent } from './renameComponent';

type EntryInner = { [key: string]: Entry } | string;

type Entry = {
  [key: string]: EntryInner;
};

afterEach(() => {
  mock.restore();
});

it('should rename ts files', async () => {
  mock({
    ...getLazyLoadedNodeModules(),
    'src/ComponentA': {
      'index.ts': `export { ComponentA } from './ComponentA.tsx';`,
      'ComponentA.tsx': `export const ComponentA = () => <div className="ComponentA__foo" />;`,
      'ComponentA.css': `.ComponentA__foo {}`,
    },
  });

  await renameComponent({ base: 'src', from: 'ComponentA', to: 'ComponentB' });

  expect(await isDirectory('src/ComponentA')).toBe(false);

  expect(await readFile('src/ComponentB/index.ts')).toBe(
    `export { ComponentB } from './ComponentB.tsx';`
  );
  expect(await readFile('src/ComponentB/ComponentB.tsx')).toBe(
    `export const ComponentB = () => <div className="ComponentB__foo" />;`
  );
  expect(await readFile('src/ComponentB/ComponentB.css')).toBe(
    `.ComponentB__foo {}`
  );
});
