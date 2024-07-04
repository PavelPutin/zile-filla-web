import { FileSystemObject } from "../model/file-system-object";
import { FileSystemApi } from "./file-system-api";
import { FILE_SYSTEM } from "./mock-backend";

class MockFileSystemApi implements FileSystemApi {
  async changeDirectory(path: string): Promise<FileSystemObject[]> {
    console.log(`start changeDirectory(${path})`);
    await new Promise((resolved) => setTimeout(resolved, 1000));
    console.log("end waiting");
    if (path.startsWith("/explorer")) {
      path = path.replace("/explorer", "");
    }
    return new Promise<FileSystemObject[]>((resolve) => resolve(FILE_SYSTEM[path]));
  }
}

export const fileSystemApi = new MockFileSystemApi();