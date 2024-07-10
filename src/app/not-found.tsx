import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box>
      <Typography align="center" variant="h1">Страница не найдена</Typography>
      <Typography align="center" variant="h2">404</Typography>
      <Typography align="center">
        <Link href="/explorer">На главную</Link>
      </Typography>
    </Box>
  );
}