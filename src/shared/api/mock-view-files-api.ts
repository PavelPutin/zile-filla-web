import { TextFileContent } from "../model/text-file-content";
import { FILES } from "./mock-files-backend";
import { ViewFilesApi } from "./view-files-api";

export class MockViewFilesApi implements ViewFilesApi {
  async getFileContent(path: string): Promise<TextFileContent> {
    console.log(`start view file(${path})`);
    await new Promise((resolved) => setTimeout(resolved, 1000));
    console.log("end waiting");
    if (path.startsWith("/view")) {
      path = path.replace("/view", "");
    }
    return new Promise<TextFileContent>((resolve) => resolve(FILES[path]));
  }
}
