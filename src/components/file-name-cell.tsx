"use client"

import { addExplorerPrefix, addViwPrefix as addViewPrefix, concatPath } from "@/shared/lib/path-utils";
import { TableCell, Box, Stack, Typography, Tooltip, IconButton, TextField, CircularProgress, Snackbar, Alert, AlertTitle } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import WarningIcon from '@mui/icons-material/Warning';
import { FileSystemObject } from "@/shared/model/file-system-object";
import { useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { RenameActionState, renameFileSystemObject } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import { error } from "console";
import ErrorInfo, { ErrorInfoProps } from "./error-info";


function ControllPart({onSubmitClick, onCancelClick }: { onSubmitClick: () => void, onCancelClick: () => void }) {
  const { pending } = useFormStatus();

  return pending ?
    <CircularProgress size={30}/> :
    <Stack direction={"row"} alignItems={"center"}>
      <Tooltip title="Сохранить">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            
            onSubmitClick();
          }}
          type="submit"
        >
          <DoneIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Отмена">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onCancelClick();
          }}
        >
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  ;
}

export default function FileNameCell({ value, fetchingPath }: { value: FileSystemObject, fetchingPath: string }) {
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [state, formAction] = useFormState(renameFileSystemObject, {message: "", newName: "", error: {status: 0, title: "", detail: "", type: "", instance: ""} as ErrorInfoProps});
  const [editing, setEditing] = useState(false);
  const [nameError, setNameError] = useState(false);

  const controllPart = 
    editing ?
      <ControllPart
        onSubmitClick={() => {}} 
        onCancelClick={() => {
          setEditing(false);
          setNameError(false);
        }}
      /> :
      <Tooltip title="Переименовать файл">
            <IconButton 
              onClick={(e) => {
                e.stopPropagation();
                setEditing(true);
              }}
            >
              <DriveFileRenameOutlineIcon />
            </IconButton>
      </Tooltip>;

  if (state.message === "Done") {
    state.message = "";
    value.name = state.newName ?? "";
    state.newName = "";
    setEditing(false);
    setNameError(false);
  } else if (state.message === "Error") {
    state.message = "";
    setNameError(true);
    setSnackBarVisible(true);
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarVisible(false);
  };

  return (
    <TableCell>
      <form action={formAction}>
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
                <>
                  <input name="source" value={fetchingPath + (fetchingPath === "/" ? "" : "/") + value.name} hidden readOnly/>
                  <TextField
                    error={ nameError }
                    placeholder={ nameError ? "Имя не может быть пустым" : undefined }
                    id="file-name"
                    name="file-name"
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
                  />
                </> :
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
          
          { controllPart }
        </Box>
        <ErrorInfo error={state.error} variant="snackbar" open={snackBarVisible} handleClose={handleClose}  />
      </form>
    </TableCell>
  );
}