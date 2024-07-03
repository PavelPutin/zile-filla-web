import { FileSystemMetadata } from "../model/file-system-metadata";
import { FileSystemObject } from "../model/file-system-object";

export const FILE_SYSTEM: { [key: string]: FileSystemObject[] } = {
  "/": [
    new FileSystemObject("dir", "etc", new FileSystemMetadata(500, new Date(), new Date(), new Date())),
    new FileSystemObject("dir", "hello", new FileSystemMetadata(500, new Date(), new Date(), new Date())),
  ],
  "/etc": [
    new FileSystemObject("file", "photo.txt", new FileSystemMetadata(500, new Date(), new Date(), new Date())),
  ],
  "/hello": [
    new FileSystemObject("file", "resulsts.pdf", new FileSystemMetadata(500, new Date(), new Date(), new Date())),
  ]
}