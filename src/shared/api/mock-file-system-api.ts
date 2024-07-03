import { FILE_SYSTEM } from "./mock-backend";

class MockFileSystemApi implements FileSystemApi {
  async changeDirectory(path: string): Promise<FileSystemObject[]> {
    await new Promise((resolved) => setTimeout(resolved, 1000));
    return new Promise(() => FILE_SYSTEM[path]);
  }
}