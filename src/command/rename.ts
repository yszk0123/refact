import { Project } from 'ts-morph';
import { isDirectory } from '../helper/isDirectory';

type CSSAST = unknown;

type RenameOptions = {
  from: string;
  to: string;
};

type InternalRenameOptions = {
  from: string;
  to: string;
  ast: CSSAST;
  project: Project;
};

export async function rename({ from, to }: RenameOptions): Promise<void> {
  const project = new Project();
  project.addSourceFilesAtPaths(['**/*.{ts,tsx,js,jsx,css}', '!node_modules']);
  const isDir = await isDirectory(from);
  if (isDir) {
    const dir = project.getDirectoryOrThrow(from);
    dir.move(to);
  } else {
    const file = project.getSourceFileOrThrow(from);
    file.move(to);
  }
  await project.save();
  return;
  const options: InternalRenameOptions = {
    from,
    to,
    ast: {},
    project,
  };
  await renameComponent(options);
  await renameDirectory(options);
}

async function renameDirectory(options: InternalRenameOptions) {
  await renameTSDirectory(options);
  await renameCSSDirectory(options);
}

async function renameComponent(options: InternalRenameOptions) {
  await renameFunction(options);
  await Promise.all([renameJSXFile(options), renameCSSFile(options)]);
}

// Directory

async function renameTSDirectory({ from, to, project }: InternalRenameOptions) {
  console.log(`Rename "${project}" from "${from}" to "${to}"`);
  throw new Error('Not Implemented');
}

async function renameCSSDirectory(options: InternalRenameOptions) {
  await renameCSSImportFile(options);
  throw new Error('Not Implemented');
}

// JSX

async function renameJSXFile({ from, to, project }: InternalRenameOptions) {
  console.log(`Rename "${project}" from "${from}" to "${to}"`);
  throw new Error('Not Implemented');
}

async function renameFunction({ from, to, project }: InternalRenameOptions) {
  console.log(`Rename "${project}" from "${from}" to "${to}"`);
  throw new Error('Not Implemented');
}

// CSS

async function renameCSSFile({ from, to, ast }: InternalRenameOptions) {
  console.log(`Rename ${ast} "${from}" to "${to}"`);
  throw new Error('Not Implemented');
}

async function renameCSSImportFile({ from, to, ast }: InternalRenameOptions) {
  console.log(`Rename ${ast} "${from}" to "${to}"`);
  throw new Error('Not Implemented');
}
