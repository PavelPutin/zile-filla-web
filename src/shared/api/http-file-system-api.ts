import { FileSystemMetadata } from "../model/file-system-metadata";
import { FileSystemObject } from "../model/file-system-object";
import { FileSystemApi } from "./file-system-api";

export class HttpFileSystemApi implements FileSystemApi {
  async changeDirectory(path: string): Promise<FileSystemObject[]> {
    console.log(`start changeDirectory(${path})`);
    const response = await fetch(`http://${process.env.BACKEND_HOST}:8080/explorer${path}`, {cache: "no-store"});
    if (!response.ok) {
      throw await response.json();
    }
    console.log(`response to ${path} payload`);
    let payload = (await response.json()) as any[];

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

