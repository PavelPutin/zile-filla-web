"use client"

import { addExplorerPrefix, addViwPrefix as addViewPrefix, concatPath } from "@/shared/lib/path-utils";
import { FileSystemObject } from "@/shared/model/file-system-object";
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Drawer, Toolbar, List, ListItem, ListItemText, Typography, IconButton, Stack, Divider, ListItemIcon, Tooltip, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import FixedTableCell from "./fixed-table-cell";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import FileBreadcrumbs from "./file-breadcrumbs";
import { SizeConvert } from "@/shared/lib/size-converter";
import ErrorInfo, { ErrorInfoProps } from "./error-info";
import Image from "next/image";
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FileNameCell from "./file-name-cell";
import { useFormState, useFormStatus } from "react-dom";
import { deleteFileSystemObject } from "@/app/actions";

type InfoData = {
  title: string,
  data: string
  warning?: boolean
  detail?: string
}

function DeleteButton({ onDelete, args }: { onDelete: (args: string[]) => void, args: string[] }) {
  const [ pending, setPending ]  = useState(false);

  return pending ?
    <CircularProgress size={15} color="error" /> :
    <Tooltip title="Удалить" onClick={() => {
      
    }}>
      <IconButton >
        <DeleteIcon color="error" onClick={() => {
          setPending(true);
          onDelete(args);
        }}/>
      </IconButton>
    </Tooltip>
  ;
}

export default function Explorer({ pathElements, fetchingPath, fileSystemObjects, error } : { pathElements: string[], fetchingPath: string, fileSystemObjects : FileSystemObject[], error: any | undefined }) {
  const router = useRouter();
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
        data: SizeConvert(selected.metadata.sizeBytes),
        warning: !selected.metadata.sizeAccurate,
        detail: "Не удалось расчитать полный размер из-за отсутствия доступа к некоторым дочерним файлам"
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

  function handleRowClick(event: MouseEvent, value: FileSystemObject) {
    const key = concatPath(fetchingPath, value.name);
    if (event.button !== 0) {
      return;
    }

    if (event.ctrlKey) {
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
    } else {
      if (key in selectedObjects && selectedObjectsAmount === 1) {
        setSelectedObjects({});
      } else {
        let justSelected : { [key: string]: FileSystemObject } = {};
        justSelected[key] = value;
        setSelectedObjects(justSelected);
      }
    }
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box component="div" sx={{ flexGrow: 1}}>
          <Box component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
            <FileBreadcrumbs pathElements={pathElements} />
            {
              error === undefined &&
              <Stack direction={"row"} sx={{ minHeight: 40 }}>
                {selectedObjectsAmount > 0 && <Typography alignContent="center">Выбрано элементов: {selectedObjectsAmount}</Typography>}
                {selectedObjectsAmount === 1 && <IconButton onClick={() => {setInfoDrawerIsHidden(false)}}><InfoIcon /></IconButton>}
                {selectedObjectsAmount > 0 && <DeleteButton />
                }
              </Stack>
            }
          </Box>
          {
            error === undefined ?
              fileSystemObjects.length === 0 ?
                <Box>
                  <Typography align="center">
                    Директория пустая
                  </Typography>
                </Box> :
                <TableContainer component={Paper}>
                  <Table aria-label="Содержимое папки">
                    <TableHead>
                      <TableRow>
                        <TableCell><Typography>Название</Typography></TableCell>
                        <FixedTableCell><Typography>Время создания</Typography></FixedTableCell>
                        <FixedTableCell><Typography>Время изменения</Typography></FixedTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        fileSystemObjects.map((value) => (
                          <TableRow 
                            key={concatPath(fetchingPath, value.name)} 
                            hover 
                            sx={{ cursor: 'pointer' }} 
                            onClick={(e) => handleRowClick(e.nativeEvent, value)}
                            selected={isSelected(concatPath(fetchingPath, value.name))}
                            onDoubleClick={() => router.push(
                              value.type === "dir" ?
                                addExplorerPrefix(concatPath(fetchingPath, value.name)) :
                                addViewPrefix(concatPath(fetchingPath, value.name))
                            )}
                          >
                            <FileNameCell value={value} fetchingPath={fetchingPath} />
                            <FixedTableCell><Typography>{dateFormater.format(value.metadata.creation)}</Typography></FixedTableCell>
                            <FixedTableCell><Typography>{dateFormater.format(value.metadata.modification)}</Typography></FixedTableCell>
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
          error === undefined && fileSystemObjects.length !== 0 &&
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
              <Box padding={2} sx={{ display: "flex", justifyContent: "space-between" }}>
                {
                  selectedObjectsAmount === 1 ?
                    <Typography alignContent="center">{Object.values(selectedObjects)[0].name}</Typography> :
                    <Typography alignContent="center">Выбрано элементов: {selectedObjectsAmount}</Typography>
                }
                <IconButton onClick={() => {setInfoDrawerIsHidden(true)}}><CloseIcon /></IconButton>
              </Box>
              {
                infoData &&
                <>
                  <Divider />
                  <Box padding={2}> 
                    <List>
                      {infoData.map((data, index) => {
                        return (
                          <ListItem key={data.title} disablePadding>
                            <ListItemText>
                              <ListItemText primary={data.title} secondary={data.data}/>
                            </ListItemText>
                            {
                              data.warning &&
                              <Tooltip title={data.detail}>
                                <ListItemIcon>
                                  <WarningIcon color="warning"/>
                                </ListItemIcon>
                              </Tooltip>
                            }
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                </>
              }
            </Box>
          </Drawer>
        }
      </Box>
    </>
  );
}