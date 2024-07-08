"use client"

import { TextFileContent } from "@/shared/model/text-file-content";
import FileBreadcrumbs from "./file-breadcrumbs";
import { Box, Paper, Typography } from "@mui/material";

// TODO: make props as type
export default function Explorer({ pathElements, fileContent } : { pathElements: string[], fileContent: TextFileContent }) {
  return (
    <>
      <FileBreadcrumbs pathElements={pathElements} />
      <Paper elevation={3}>
        <Box p={5}>
          <Typography sx={{ whiteSpace: "pre-wrap" }}>{fileContent.content}</Typography>
        </Box>
      </Paper>
    </>
  );
}