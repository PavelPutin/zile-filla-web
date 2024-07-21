import { FileSystemObject } from "../model/file-system-object";
import { HttpFileSystemApi } from "./http-file-system-api";

export interface FileSystemApi {
  changeDirectory(path: string) : Promise<FileSystemObject[]>;
  rename(source: string, newName: string) : Promise<void>;
  delete(path: string) : Promise<void>;
  move(source: string, destination: string) : Promise<void>;
}

export const fileSystemApi = new HttpFileSystemApi();