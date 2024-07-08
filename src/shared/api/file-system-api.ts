import { FileSystemObject } from "../model/file-system-object";
import { HttpFileSystemApi } from "./http-file-system-api";

export interface FileSystemApi {
  changeDirectory(path: string) : Promise<FileSystemObject[]>;
}

export const fileSystemApi = new HttpFileSystemApi();