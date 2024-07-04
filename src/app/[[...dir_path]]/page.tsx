import FileBreadcrumbs from "@/components/file-breadcrumbs";
import { fileSystemApi } from "@/shared/api/mock-file-system-api";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { notFound } from "next/navigation";
import { concatPath, joinPath } from "@/shared/lib/path-utils";

export default async function Page({ params }: { params: { dir_path?: string[] } }) {
  const pathElements = [""];
  (params.dir_path ?? []).forEach((value) => pathElements.push(value));

  console.log("fetching data");
  const fetchingPath = joinPath(pathElements);
  const result = await fileSystemApi.changeDirectory(fetchingPath);
  if (result === undefined) {
    notFound();
  }
  console.log(`file system objects: ${result}`);

  return (
    <>
      <FileBreadcrumbs pathElements={pathElements} />
      <List>
        {
          result.map((value) => {
            return (
              <ListItem>
                <Link href={concatPath(fetchingPath, value.name)}>{value.name}</Link>
              </ListItem>
            );
          })
        }
      </List>
    </>
  );
}