"use client"

import { addExplorerPrefix, concatPath } from "@/shared/lib/path-utils";
import { FileSystemObject } from "@/shared/model/file-system-object";
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Drawer, Toolbar, List, ListItem, ListItemText, Divider, ListItemButton, ListItemIcon, Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import FixedTableCell from "./fixed-table-cell";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function Explorer({ fetchingPath, fileSystemObjects } : { fetchingPath: string, fileSystemObjects : FileSystemObject[] }) {
  const [selectedObjects, setSelectedObjects] = useState<{[path: string]: FileSystemObject}>({});
  const dateFormater: Intl.DateTimeFormat = new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });
  const drawerWidth = 240;
  return (<>
    <Button onClick={() => console.log(selectedObjects)}>Show state</Button>
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
              fileSystemObjects.map((value) => (
                <TableRow key={concatPath(fetchingPath, value.name)} onClick={() => {
                  const key = concatPath(fetchingPath, value.name);
                  if (key in selectedObjects) {
                    let copy = { ...selectedObjects };
                    delete copy[key];
                    setSelectedObjects(copy);
                  } else {
                    let justSelected : { [key: string]: FileSystemObject } = {};
                    justSelected[key] = value;
                    setSelectedObjects(selectedObjects => ({
                      ...selectedObjects,
                      ...justSelected
                    }));
                  }
                }}>
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
    </Box></>
  );
}