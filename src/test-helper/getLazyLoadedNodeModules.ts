import type FileSystem from 'mock-fs/lib/filesystem';
import { createLazyLoadDirectoryItems } from './createLazyLoadDirectoryItems';

let cache: FileSystem.DirectoryItems;

export function getLazyLoadedNodeModules(): FileSystem.DirectoryItems {
  if (!cache) {
    cache = createLazyLoadDirectoryItems('node_modules');
  }
  return cache;
}
