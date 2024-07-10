import View from "@/components/view";
import { viewFilesApi } from "@/shared/api/view-files-api";
import { joinPath } from "@/shared/lib/path-utils";

export default async function Page({ params }: { params: { dir_path?: string[] } }) {
  const pathElements = [""];
  (params.dir_path ?? []).forEach((value) => pathElements.push(value));

  console.log("fetching file to view content");
  const fetchingPath = joinPath(pathElements);
  try {
    const fileContent = await viewFilesApi.getFileContent(fetchingPath);
    return (
      <View pathElements={pathElements} fileContent={fileContent} error={undefined}/>
    );
  } catch (e: any) {
    console.log(e);
    return (
      <View pathElements={pathElements} fileContent={{content: ""}} error={e} /> 
    );
  }
}