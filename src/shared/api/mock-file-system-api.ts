import { FileSystemObject } from "../model/file-system-object";
import { FileSystemApi } from "./file-system-api";
import { FILE_SYSTEM } from "./mock-backend";

class MockFileSystemApi implements FileSystemApi {
  async changeDirectory(path: string): Promise<FileSystemObject[]> {
    console.log(`start changeDirectory(${path})`);
    await new Promise((resolved) => setTimeout(resolved, 1000));
    console.log("end waiting");
    const result = new Promise<FileSystemObject[]>((resolve) => resolve(FILE_SYSTEM[path]));
    console.dir(result);
    return result;
  }
}

export const fileSystemApi = new MockFileSystemApi();