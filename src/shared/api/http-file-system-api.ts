import { revalidatePath } from "next/cache";
import { FileSystemMetadata } from "../model/file-system-metadata";
import { FileSystemObject } from "../model/file-system-object";
import { FileSystemApi } from "./file-system-api";

export class HttpFileSystemApi implements FileSystemApi {
  async changeDirectory(path: string): Promise<FileSystemObject[]> {
    console.log(`Start changeDirectory(${path}). Fetching http://${process.env.BACKEND_HOST}:8080/explorer${path}`);
    const response = await fetch(`http://${process.env.BACKEND_HOST}:8080/v1/explorer${path}`, {cache: "no-store"});
    console.log(`Response status from ${path}: ${response.status} (${response.statusText})`);
    if (!response.ok) {
      const problem = await response.json();
      console.log(`Problem: ${problem}`);
      throw problem;
    }
    let payload = (await response.json()) as any[];
    console.log(payload);

    payload = payload.map((value, index) => {
      const fsObject: FileSystemObject = {
        "type": value["type"],
        "name": value["name"],
        "metadata": {
          "sizeBytes": value["metadata"]["sizeBytes"],
          "sizeAccurate": value["metadata"]["sizeAccurate"],
          "readable": value["metadata"]["readable"],
          "creation": new Date(value["metadata"]["creation"]),
          "access": new Date(value["metadata"]["access"]),
          "modification": new Date(value["metadata"]["modification"]),
        } as FileSystemMetadata
      };
      return fsObject;
    }) as FileSystemObject[];

    console.log(`Fetched ${payload.length} elements`);
    revalidatePath(`/explorer${path}`);
    return payload;
  }

  async rename(source: string, newName: string): Promise<void> {
    console.log(`Start rename(${source}, ${newName}). Fetching http://${process.env.BACKEND_HOST}:8080/explorer${source}`);
    const response = await fetch(`http://${process.env.BACKEND_HOST}:8080/v1/explorer${source}`, {
      method: "PUT",
      cache: "no-store",
      body: JSON.stringify({
        newName: newName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(`Response status from ${source}: ${response.status} (${response.statusText})`);
    if (!response.ok) {
      const problem = await response.json();
      console.log(`Problem: ${problem}`);
      throw problem;
    }
    
    return;
  }


  async delete(path: string) : Promise<void> {
    console.log(`Start delete(${path}). Fetching http://${process.env.BACKEND_HOST}:8080/explorer${path}`);
    const response = await fetch(`http://${process.env.BACKEND_HOST}:8080/v1/explorer${path}`, {cache: "no-store", method: "DELETE",});
    console.log(`Response status from ${path}: ${response.status} (${response.statusText})`);
    if (!response.ok) {
      const problem = await response.json();
      console.log(`Problem: ${problem}`);
      throw problem;
    }
    console.log("Compolete deleting");
    
    revalidatePath(`/explorer${path}`);
    return;
  }

  async move(source: string, destination: string) {
    console.log(`Start move ${source} to ${destination}`);
    const response = await fetch(`http://${process.env.BACKEND_HOST}:8080/v1/explorer${source}`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        actionType: "MOVE",
        target: destination
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(`Response status from ${source}: ${response.status} (${response.statusText})`);
    if (!response.ok) {
      const problem = await response.json();
      console.log(`Problem: ${problem}`);
      throw problem;
    }
    console.log("Complete move");
    revalidatePath(`/explorer${source}`);
  }

  async copy(source: string, destination: string) {
    console.log(`Start copy ${source} to ${destination}`);
    const response = await fetch(`http://${process.env.BACKEND_HOST}:8080/v1/explorer${source}`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        actionType: "COPY",
        target: destination
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(`Response status from ${source}: ${response.status} (${response.statusText})`);
    if (!response.ok) {
      const problem = await response.json();
      console.log(`Problem: ${problem}`);
      throw problem;
    }
    console.log("Complete copy");
    revalidatePath(`/explorer${source}`);
  }
}

