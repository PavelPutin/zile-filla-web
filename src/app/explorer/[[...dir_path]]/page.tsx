import FileBreadcrumbs from "@/components/file-breadcrumbs";
import { fileSystemApi } from "@/shared/api/mock-file-system-api";
import { addExplorerPrefix, concatPath, joinPath } from "@/shared/lib/path-utils";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

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

  const drawerWidth = 240;
  return (
    <>
      <FileBreadcrumbs pathElements={pathElements} />
      <Box sx={{ display: "flex" }}>
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
                      <Link
                        href={value.type === "dir" ?
                            addExplorerPrefix(concatPath(fetchingPath, value.name)) :
                            "#"
                        }>
                        {value.name}
                      </Link>
                  </TableCell>
                  <FixedTableCell>{dateFormater.format(value.metadata.creation)}</FixedTableCell>
                  <FixedTableCell>{dateFormater.format(value.metadata.modification)}</FixedTableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Drawer
        variant="permanent"
        anchor="right"
        hidden={false}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {["hello", "world"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemText>
                  <ListItemText primary={text} />
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      </Box>
    </>
  );
}