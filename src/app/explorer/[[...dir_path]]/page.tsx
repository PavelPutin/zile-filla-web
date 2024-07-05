import FileBreadcrumbs from "@/components/file-breadcrumbs";
import { fileSystemApi } from "@/shared/api/mock-file-system-api";
import { addExplorerPrefix, concatPath, joinPath } from "@/shared/lib/path-utils";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
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