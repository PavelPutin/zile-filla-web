import { TextFileContent } from "../model/text-file-content";
import { ViewFilesApi } from "./view-files-api";

export class HttpViewFilesApi implements ViewFilesApi {
  async getFileContent(path: string): Promise<TextFileContent> {
    console.log(`start view file(${path})`);
    console.log(`fetch http://${process.env.BACKEND_HOST}/visit${path}`)
    const response = await fetch(`http://${process.env.BACKEND_HOST}:8080/view${path}`);
    if (!response.ok) {
      throw new Error();
    }
    let payload = (await response.json()) as TextFileContent;
    return payload;
  }
}
