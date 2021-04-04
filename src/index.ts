import { Project } from 'ts-morph';

main().catch(console.error);

async function main() {
  // await fs.mkdir('tmp', { recursive: true });

  const project = new Project({
    compilerOptions: {
      rootDir: 'tmp',
    },
  });
  project.addSourceFilesAtPaths('tmp/*.{ts,js,css}');
  //   project.createSourceFile(
  //     'tmp/test.ts',
  //     `
  // export function test() {
  //   console.log('test');
  // }
  //   `.trim()
  //   );
  const file = project.getSourceFileOrThrow('tmp/test.css');
  const text = file.getText();
  console.log('TEXT', text);
  // file.move('test.css');
  await project.save();
}
