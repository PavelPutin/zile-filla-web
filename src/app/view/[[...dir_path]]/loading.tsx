import { Stack, CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  console.log("loading viewer...");
  return (
    <Stack alignItems={"center"}>
      <CircularProgress />
      <Typography>Загружаю содержимое файла!</Typography>
    </Stack>
  );
}