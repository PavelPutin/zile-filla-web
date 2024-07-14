import { fileSystemApi } from "@/shared/api/file-system-api";
import { joinPath } from "@/shared/lib/path-utils";
import Explorer from "@/components/explorer";
import ErrorInfo from "@/components/error-info";

export default async function Page({ params }: { params: { dir_path?: string[] } }) {
  const pathElements = [""];
  (params.dir_path ?? []).forEach((value) => pathElements.push(decodeURI(value)));

  console.log("fetching data");
  const fetchingPath = joinPath(pathElements);
  
  try {
    const currentDirectoryChildren = await fileSystemApi.changeDirectory(fetchingPath);
    console.log(`file system objects: ${currentDirectoryChildren}`);
    return (
      <>
        <Explorer pathElements={pathElements} fetchingPath={fetchingPath} initFileSystemObjects={currentDirectoryChildren} error={undefined}/>
      </>
    );
  } catch (e: any) {
    return (
      <>
        <Explorer pathElements={pathElements} fetchingPath={fetchingPath} initFileSystemObjects={[]} error={e}/>
      </>
    );
  }
}