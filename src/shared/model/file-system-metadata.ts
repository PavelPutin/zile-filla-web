export type FileSystemMetadata = {
  sizeBytes: number;
  sizeAccurate: boolean,
  readable: boolean,
  creation: Date;
  access: Date;
  modification: Date;
}
