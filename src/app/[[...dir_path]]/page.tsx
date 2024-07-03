import FileBreadcrumbs from "@/components/file-breadcrumbs";
import { fileSystemApi } from "@/shared/api/mock-file-system-api";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default async function Page({ params }: { params: { dir_path?: string[] } }) {
  const pathElements = [""];
  (params.dir_path ?? []).forEach((value) => pathElements.push(value));

  console.log("fetching data");
  const result = await fileSystemApi.changeDirectory("/");
  console.log(`file system objects: ${result}`);

  return (
    <>
      <FileBreadcrumbs pathElements={pathElements} />
      <p><Link href="/etc">/etc</Link></p>
      <List>
        {
          result.map((value) => {
            return (
              <ListItem>
                <ListItemText primary={value.name} />
              </ListItem>
            );
          })
        }
      </List>
    </>
  );
}