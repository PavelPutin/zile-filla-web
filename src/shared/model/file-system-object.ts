class FileSystemObject {
  readonly type: "file" | "dir";
  readonly name: "string";
  readonly metadata: FileSystemMetadata;
  readonly children?: FileSystemObject[];

  constructor(type: "file" | "dir", name: "string", metadata: FileSystemMetadata, children?: FileSystemObject[]) {
    this.type = type;
    this.name = name;
    this.metadata = metadata;
    this.children = children;
  }
}
