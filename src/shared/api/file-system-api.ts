import { FileSystemObject } from "../model/file-system-object";

export interface FileSystemApi {
  changeDirectory(path: string) : Promise<FileSystemObject[]>;
}