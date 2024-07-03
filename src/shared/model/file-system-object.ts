import { FileSystemMetadata } from "./file-system-metadata";

export class FileSystemObject {
  readonly type: "file" | "dir";
  readonly name: String;
  readonly metadata: FileSystemMetadata;

  constructor(type: "file" | "dir", name: String, metadata: FileSystemMetadata) {
    this.type = type;
    this.name = name;
    this.metadata = metadata;
  }
}
