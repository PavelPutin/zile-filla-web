import FileBreadcrumbs from "@/components/file-breadcrumbs";
import { fileSystemApi } from "@/shared/api/mock-file-system-api";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { notFound } from "next/navigation";
import { concatPath, joinPath } from "@/shared/lib/path-utils";
import { Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

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

  const dateFormater: Intl.DateTimeFormat = new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });

  const FixedTableCell = ({ children }: { children: string }) => 
    <TableCell sx={{ width: 250 }}>{children}</TableCell>;
  return (
    <>
      <FileBreadcrumbs pathElements={pathElements} />
      {/* <List>
        {
          result.map((value) => {
            return (
              <ListItem>
                <Link href={concatPath(fetchingPath, value.name)}>{value.name}</Link>
              </ListItem>
            );
          })
        }
      </List> */}
      <TableContainer component={Paper}>
        <Table aria-label="Содержимое папки">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <FixedTableCell>Время создания</FixedTableCell>
              <FixedTableCell>Время изменения</FixedTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              currentDirectoryChildren.map((value) => (
                <TableRow key={value.type+value.name}>
                  <TableCell>
                    <Link href={concatPath(fetchingPath, value.name)}>{value.name}</Link>
                  </TableCell>
                  <FixedTableCell>{dateFormater.format(value.metadata.creation)}</FixedTableCell>
                  <FixedTableCell>{dateFormater.format(value.metadata.modification)}</FixedTableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}