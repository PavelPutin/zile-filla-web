import { fileSystemApi } from "@/shared/api/file-system-api";
import { joinPath } from "@/shared/lib/path-utils";
import Explorer from "@/components/explorer";
import { NoSuchFileError } from "@/shared/api/error/no-such-file-error";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { dir_path?: string[] } }) {
  const pathElements = [""];
  (params.dir_path ?? []).forEach((value) => pathElements.push(value));

  console.log("fetching data");
  const fetchingPath = joinPath(pathElements);
  
  try {
    const currentDirectoryChildren = await fileSystemApi.changeDirectory(fetchingPath);
    console.log(`file system objects: ${currentDirectoryChildren}`);
    return (
      <>
        <Explorer pathElements={pathElements} fetchingPath={fetchingPath} fileSystemObjects={currentDirectoryChildren} />
      </>
    );
  } catch (e) {
    if (e instanceof NoSuchFileError) {
      notFound();
    }
  }
  return <></>;
}