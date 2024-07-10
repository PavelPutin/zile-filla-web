import { FileSystemMetadata } from "../model/file-system-metadata";
import { FileSystemObject } from "../model/file-system-object";
import { FileSystemApi } from "./file-system-api";

export class HttpFileSystemApi implements FileSystemApi {
  async changeDirectory(path: string): Promise<FileSystemObject[]> {
    console.log(`Start changeDirectory(${path})`);
    const response = await fetch(`http://${process.env.BACKEND_HOST}:8080/explorer${path}`, {cache: "no-store"});
    console.log(`Response status from ${path}: ${response.status} (${response.statusText})`);
    if (!response.ok) {
      const problem = await response.json();
      console.log(`Problem: ${problem}`);
    }
    let payload = (await response.json()) as any[];

    payload = payload.map((value, index) => {
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
      return fsObject;
    }) as FileSystemObject[];

    console.log(`Fetched ${payload.length} elements`);
    return payload;
  }
}

