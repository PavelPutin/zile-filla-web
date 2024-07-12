"use client"

import { addExplorerPrefix, addViwPrefix as addViewPrefix, concatPath } from "@/shared/lib/path-utils";
import { TableCell, Box, Stack, Typography, Tooltip, IconButton, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import WarningIcon from '@mui/icons-material/Warning';
import { FileSystemObject } from "@/shared/model/file-system-object";
import { useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';


export default function FileNameCell({ value, fetchingPath }: { value: FileSystemObject, fetchingPath: string }) {
  const [editing, setEditing] = useState(false);
  const [nameError, setNameError] = useState(false);

  return (
    <TableCell>
      <Box display={"flex"} justifyContent={"space-between"} flexGrow={1}>
        <Stack alignItems="center" direction="row" gap={2} flexGrow={1}>
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
          
          {
            editing ?
              <TextField
                error={ nameError }
                placeholder={ nameError ? "Имя не может быть пустым" : undefined }
                id="file-name"
                size="small" 
                defaultValue={value.name}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  if (e.target.value.trim().length !== 0) {
                    setNameError(false);
                  } else {
                    setNameError(true);
                  }
                }}
              /> :
              <Link
                href={value.type === "dir" ?
                    addExplorerPrefix(concatPath(fetchingPath, value.name)) :
                    addViewPrefix(concatPath(fetchingPath, value.name))
                }
              >
                <Typography>{value.name}</Typography>
              </Link>
          }

          {
            !value.metadata.readable &&
            <Tooltip title="Файл не доступен для чтения">
              <WarningIcon color="warning"/>
            </Tooltip>
          }
        </Stack>
        
        {
          editing ?
            <Stack direction={"row"} alignItems={"center"}>
              <Tooltip title="Сохранить">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <DoneIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Отмена">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditing(false);
                    setNameError(false);
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            </Stack> :

            <Tooltip title="Переименовать файл">
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  setEditing(true);
                }}
              >
                <DriveFileRenameOutlineIcon />
              </IconButton>
            </Tooltip>
        }

      </Box>
    </TableCell>
  );
}