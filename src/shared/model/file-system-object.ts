import { FileSystemMetadata } from "./file-system-metadata";

export type FileSystemObject = {
  type: "file" | "dir";
  name: string;
  metadata: FileSystemMetadata;
}
