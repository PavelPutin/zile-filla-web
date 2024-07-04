import { FileSystemMetadata } from "../model/file-system-metadata";
import { FileSystemObject } from "../model/file-system-object";

export const FILE_SYSTEM: { [key: string]: FileSystemObject[] } = {
  "/": [
    {type: "dir", name: "etc", metadata: {sizeBytes: 500, creation: new Date(), access: new Date(), modification: new Date()}},
    {type: "dir", name: "hello", metadata: {sizeBytes: 500, creation: new Date(), access: new Date(), modification: new Date()}},
  ],
  "/etc": [
    {type: "file", name: "photo.txt", metadata: {sizeBytes: 500, creation: new Date(), access: new Date(), modification: new Date()}},
  ],
  "/hello": [
    {type: "file", name: "resulsts.pdf", metadata: {sizeBytes: 500, creation: new Date(), access: new Date(), modification: new Date()}},
  ]
}