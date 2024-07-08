import { TextFileContent } from "../model/text-file-content";
import { HttpViewFilesApi } from "./http-view-files-api";

export interface ViewFilesApi {
  getFileContent(path: string) : Promise<TextFileContent>;
}

export const viewFilesApi = new HttpViewFilesApi();