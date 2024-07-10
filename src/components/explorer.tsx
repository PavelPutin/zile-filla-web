"use client"

import { addExplorerPrefix, addViwPrefix as addViewPrefix, concatPath } from "@/shared/lib/path-utils";
import { FileSystemObject } from "@/shared/model/file-system-object";
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Drawer, Toolbar, List, ListItem, ListItemText, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import FixedTableCell from "./fixed-table-cell";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import FileBreadcrumbs from "./file-breadcrumbs";
import { SizeConvert } from "@/shared/lib/size-converter";
import ErrorInfo from "./error-info";
import Image from "next/image";

type InfoData = {
  title: string,
  data: string
}

export default function Explorer({ pathElements, fetchingPath, fileSystemObjects, error } : { pathElements: string[], fetchingPath: string, fileSystemObjects : FileSystemObject[], error: any | undefined }) {
  const [selectedObjects, setSelectedObjects] = useState<{[path: string]: FileSystemObject}>({});
  const [infoDrawerIsHidden, setInfoDrawerIsHidden] = useState<boolean>(true);
  const dateFormater: Intl.DateTimeFormat = new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });
  const drawerWidth = 500;
  const selectedObjectsAmount = Object.keys(selectedObjects).length;
  
  let infoData: InfoData[] | undefined;
  if (selectedObjectsAmount === 1) {
    const selected = Object.values(selectedObjects)[0];
    infoData = [
      {
        title: "Размер",
        data: SizeConvert(selected.metadata.sizeBytes)
      }, {
        title: "Дата создания",
        data: dateFormater.format(selected.metadata.creation),
      }, {
        title: "Дата изменения",
        data: dateFormater.format(selected.metadata.modification),
      }, {
        title: "Дата доступа",
        data: dateFormater.format(selected.metadata.access),
      }
    ]
  }

  function isSelected(key: string): boolean {
    return selectedObjects[key] !== undefined;
  }

  function handleRowClick(value: FileSystemObject) {
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
  }

  return (<>
    <Box sx={{ display: "flex" }}>
      <Box component="div" sx={{ flexGrow: 1}}>
        <Box component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
          <FileBreadcrumbs pathElements={pathElements} />
          {
            error !== undefined &&
            <Box sx={{ display: "flex", alignContent: "center", minHeight: 40 }}>
              {selectedObjectsAmount > 0 && <Typography alignContent="center">Выбрано элементов: {selectedObjectsAmount}</Typography>}
              {selectedObjectsAmount === 1 && <IconButton onClick={() => {setInfoDrawerIsHidden(false)}}><InfoIcon /></IconButton>}
            </Box>
          }
        </Box>
        {
          error === undefined ?
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
                    <TableRow key={concatPath(fetchingPath, value.name)} hover sx={{ cursor: 'pointer' }} onClick={() => handleRowClick(value)} selected={isSelected(concatPath(fetchingPath, value.name))}>
                      <TableCell>
                          {value.type === "dir" ?
                            <Image
                              src="/images/directory.svg"
                              width={30}
                              height={30}
                              alt="Директория:"
                            /> :
                            <Image
                              src="/images/file.svg"
                              width={30}
                              height={30}
                              alt="Файл:"
                            />
                          }
                          
                          <Link
                            href={value.type === "dir" ?
                                addExplorerPrefix(concatPath(fetchingPath, value.name)) :
                                addViewPrefix(concatPath(fetchingPath, value.name))
                            }
                          >
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
          </TableContainer> :
          <ErrorInfo error={error} />
        }
      </Box>
      {
        error !== undefined &&
        <Drawer
          variant="permanent"
          anchor="right"
          hidden={infoDrawerIsHidden}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {
                selectedObjectsAmount === 1 ?
                  <Typography alignContent="center">{Object.values(selectedObjects)[0].name}</Typography> :
                  <Typography alignContent="center">Выбрано элементов: {selectedObjectsAmount}</Typography>
              }
              <IconButton onClick={() => {setInfoDrawerIsHidden(true)}}><CloseIcon /></IconButton>
            </Box>
            {
              infoData && 
              <List>
                {infoData.map((data, index) => (
                  <ListItem key={data.title} disablePadding>
                    <ListItemText>
                      <ListItemText primary={data.title} secondary={data.data}/>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            }
          </Box>
        </Drawer>
      }
    </Box></>
  );
}