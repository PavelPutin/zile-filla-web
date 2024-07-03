interface FileSystemApi {
  changeDirectory(path: string) : Promise<FileSystemObject[]>;
}