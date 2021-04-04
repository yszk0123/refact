import { Project } from 'ts-morph';

type CSSAST = unknown;

type RenameClassOptions = {
  from: string;
  to: string;
};

type InternalRenameClassOptions = {
  from: string;
  to: string;
  ast?: CSSAST;
  project: Project;
};

export async function renameClass({
  from,
  to,
}: RenameClassOptions): Promise<void> {
  const project = new Project();
  project.addSourceFilesAtPaths(['**/*.{ts,tsx,js,jsx,css}', '!node_modules']);
  const options: InternalRenameClassOptions = {
    from,
    to,
    ast: {},
    project,
  };

  await renameComponentClass(options);
}

async function renameComponentClass(options: InternalRenameClassOptions) {
  await Promise.all([renameJSXClass(options), renameCSSClass(options)]);
}

async function renameJSXClass({
  from,
  to,
  project,
}: InternalRenameClassOptions) {
  console.log(`Rename "${project}" from "${from}" to "${to}"`);
  throw new Error('Not Implemented');
}

async function renameCSSClass({
  from,
  to,
  project,
}: InternalRenameClassOptions) {
  const text = project.getSourceFile('')?.getText() ?? '';
  const ast = text; //toAST(text);
  console.log(`Rename ${ast} from "${from}" to "${to}" in ${ast}`);
  throw new Error('Not Implemented');
}
