import { TextFileContent } from "../model/text-file-content";

export interface ViewFilesApi {
  getFileContent(path: string) : Promise<TextFileContent>;
}