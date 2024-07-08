import { fileSystemApi } from "@/shared/api/file-system-api";
import { joinPath } from "@/shared/lib/path-utils";
import { notFound } from "next/navigation";
import Explorer from "@/components/explorer";

export default async function Page({ params }: { params: { dir_path?: string[] } }) {
  const pathElements = [""];
  (params.dir_path ?? []).forEach((value) => pathElements.push(value));

  console.log("fetching data");
  const fetchingPath = joinPath(pathElements);
  const currentDirectoryChildren = await fileSystemApi.changeDirectory(fetchingPath);
  if (currentDirectoryChildren === undefined) {
    notFound();
  }
  console.log(`file system objects: ${currentDirectoryChildren}`);

  return (
    <>
      <Explorer pathElements={pathElements} fetchingPath={fetchingPath} fileSystemObjects={currentDirectoryChildren} />
    </>
  );
}