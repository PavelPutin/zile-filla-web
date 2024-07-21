import { changeDirectory } from "@/app/actions";
import { fileSystemApi } from "@/shared/api/file-system-api";
import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, DialogContent, DialogActions, Button, DialogContentText, CircularProgress, Typography, Box, IconButton, Stack } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export interface SimpleDialogProps {
  open: boolean;
  onCloseOk: (value: string) => void;
  onCloseCancel: () => void;
}

type Directory = {
  name: string,
  fullPath: string
}

export default function DestinationChooseDialog(props: SimpleDialogProps) {
  const { onCloseOk, onCloseCancel, open } = props;
  const [directoriesLoading, setDirectoriesLoading] = useState<boolean>(true);
  const [currentDirectory, setCurrentDirectory] = useState<Directory>({ name: "/", fullPath: "/" });
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [selectedValue, setSelectedValue] = useState<Directory>({ name: "/", fullPath: "/" });

  useEffect(() => {
    changeDirectory(currentDirectory.fullPath)
      .then((data) => {
        setDirectories(
          data
            .filter((value) => value.type === "dir")
            .map((value) => ({ name: value.name, fullPath: currentDirectory.fullPath + value.name + "/" }))
        );
      })
      .catch((reason) => console.log(reason))
      .finally(() => setDirectoriesLoading(false));
  }, []);

  const handleListItemClick = (value: Directory) => {
    setSelectedValue(selectedValue === value ? currentDirectory : value);
  };

  const handleListItemDoubleClick = (value: Directory) => {
    console.log(value);
    setSelectedValue(value);
    setDirectoriesLoading(true);
    changeDirectory(value.fullPath)
      .then((data) => {
        setCurrentDirectory(value); 
        setDirectories(
          data
            .filter((value) => value.type === "dir")
            .map((value) => ({ name: value.name, fullPath: currentDirectory.fullPath + value.name + "/" }))
        );
      })
      .catch((reason) => console.log(reason))
      .finally(() => setDirectoriesLoading(false));
  };

  const goBack = () => {
    let previous = currentDirectory.fullPath.lastIndexOf("/", currentDirectory.fullPath.length - 2);
    if (previous === -1) {
      return;
    }

    const previousPath = currentDirectory.fullPath.substring(0, previous + 1);
    console.log(previousPath);
    let nameSeparator = previousPath.lastIndexOf("/", previousPath.length - 2);
    const name = nameSeparator === -1 ? "/" : previousPath.substring(nameSeparator, previousPath.length)
    console.log({ name: name, fullPath: previousPath});
    setDirectoriesLoading(true);
    changeDirectory(previousPath)
      .then((data) => {
        setCurrentDirectory({ name: name, fullPath: previousPath}); 
        setDirectories(
          data
            .filter((value) => value.type === "dir")
            .map((value) => ({ name: value.name, fullPath: previousPath + value.name + "/" }))
        );
      })
      .catch((reason) => console.log(reason))
      .finally(() => setDirectoriesLoading(false));
  }

  const handleCloseOk = () => {
    onCloseOk(selectedValue.fullPath);
  }

  const handleCloseCancel = () => {
    onCloseCancel();
  }

  return (
    <Dialog onClose={handleCloseCancel} open={open}>
      <DialogTitle>Выберите папку</DialogTitle>
      <DialogContent>
        {
          currentDirectory.fullPath !== "/" &&
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <IconButton onClick={() => goBack()}><ArrowBackIosIcon /></IconButton>
              <Typography>{currentDirectory.name}</Typography>
            </Stack>
        }
        {
          directoriesLoading ?
            <CircularProgress /> :
            directories.length > 0 ?
              <List>
                {
                  directories.map((value) => (
                    <ListItemButton
                      key={value.fullPath}
                      onClick={() => handleListItemClick(value)}
                      onDoubleClick={() => handleListItemDoubleClick(value)}
                      selected={value === selectedValue}
                    >
                      <Typography>{value.name}</Typography>
                    </ListItemButton>)
                  )
                }
              </List> :
              <DialogContentText>Нет директорий</DialogContentText>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseCancel}>Отмена</Button>
        <Button onClick={handleCloseOk}>ОК</Button>
      </DialogActions>
    </Dialog>
  );
}
