export class FileSystemMetadata {
  readonly sizeBytes: number;
  readonly creation: Date;
  readonly access: Date;
  readonly modification: Date;

  constructor(sizeBytes: number, creation: Date, access: Date, modification: Date) {
    this.sizeBytes = sizeBytes;
    this.creation = creation;
    this.access = access;
    this.modification = modification;
  }
}
