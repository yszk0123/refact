/**
 * @see https://github.com/tschaub/mock-fs/issues/239#issuecomment-704939419
 */
import globby from 'globby';
import mockFS from 'mock-fs';
import type FileSystem from 'mock-fs/lib/filesystem';

export function createLazyLoadDirectoryItems(
  glob: string | string[]
): FileSystem.DirectoryItems {
  const mockedFileSystem: FileSystem.DirectoryItems = {};

  const files = globby.sync(glob);
  for (const file of files) {
    mockedFileSystem[file] = mockFS.load(file, { lazy: true });
  }

  return mockedFileSystem;
}
