import { FileSystemMetadata } from "../model/file-system-metadata";
import { FileSystemObject } from "../model/file-system-object";
import { FileSystemApi } from "./file-system-api";
import { FILE_SYSTEM } from "./mock-backend";

export class HttpFileSystemApi implements FileSystemApi {
  async changeDirectory(path: string): Promise<FileSystemObject[]> {
    console.log(`start changeDirectory(${path})`);
    console.log(`start changeDirectory(${path})`);
    const res = await fetch(`http://${process.env.BACKEND_HOST}:8080/explorer${path}`);
    if (!res.ok) {
      throw new Error();
    }
    console.log(`response to ${path} payload`);
    let payload = (await res.json()) as any[];

    payload = payload.map((value, index) => {
      console.log(value);
      const fsObject: FileSystemObject = {
        "type": value["type"],
        "name": value["name"],
        "metadata": {
          "sizeBytes": value["metadata"]["sizeBytes"],
          "creation": new Date(value["metadata"]["creation"]),
          "access": new Date(value["metadata"]["access"]),
          "modification": new Date(value["metadata"]["modification"]),
        } as FileSystemMetadata
      };
      console.dir(fsObject);
      return fsObject;
    }) as FileSystemObject[];

    return payload;
  }
}

