class FileSystemObject {
  readonly type: "file" | "dir";
  readonly name: "string";
  readonly metadata: FileSystemMetadata;

  constructor(type: "file" | "dir", name: "string", metadata: FileSystemMetadata) {
    this.type = type;
    this.name = name;
    this.metadata = metadata;
  }
}
