import { FileSystemMetadata } from "../model/file-system-metadata";
import { FileSystemObject } from "../model/file-system-object";
import { NoSuchFileError } from "./error/no-such-file-error";
import { UnknownFetchError } from "./error/unknown-fetch-error";
import { FileSystemApi } from "./file-system-api";

export class HttpFileSystemApi implements FileSystemApi {
  async changeDirectory(path: string): Promise<FileSystemObject[]> {
    console.log(`start changeDirectory(${path})`);
    const response = await fetch(`http://${process.env.BACKEND_HOST}:8080/explorer${path}`, {cache: "no-store"});
    if (!response.ok) {
      let problem = await response.json();
      const type = problem["type"];
      console.log(`Problem type: ${type}`);
      if (type === undefined) {
        throw new UnknownFetchError("Problem doesn't have any type");
      }
      if (type === "/zile-filla/no-such-file") {
        throw new NoSuchFileError(type["detail"]);
      }
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

