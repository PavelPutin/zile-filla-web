import { CircularProgress, Stack, Typography } from "@mui/material";

export default function Loading() {
  console.log("loading explorer...");
  return (
    <Stack alignItems={"center"}>
      <CircularProgress />
      <Typography>Загружаю директорию!</Typography>
    </Stack>
  );
}