import View from "@/components/view";
import { viewFilesApi } from "@/shared/api/mock-view-files-api";
import { joinPath } from "@/shared/lib/path-utils";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { dir_path?: string[] } }) {
  const pathElements = [""];
  (params.dir_path ?? []).forEach((value) => pathElements.push(value));

  console.log("fetching data");
  const fetchingPath = joinPath(pathElements);
  const fileContent = await viewFilesApi.getFileContent(fetchingPath);
  if (fileContent === undefined) {
    notFound();
  }
  return (
    <>
      <View pathElements={pathElements} fileContent={fileContent}/>
    </>
  );
}