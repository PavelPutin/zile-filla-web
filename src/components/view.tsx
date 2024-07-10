"use client"

import { TextFileContent } from "@/shared/model/text-file-content";
import FileBreadcrumbs from "./file-breadcrumbs";
import { Box, Paper, Typography } from "@mui/material";
import ErrorInfo from "./error-info";

// TODO: make props as type
export default function View({ pathElements, fileContent, error } : { pathElements: string[], fileContent: TextFileContent, error: any | undefined }) {
  return (
    <>
      <FileBreadcrumbs pathElements={pathElements} />
      {
        error === undefined ?
        <Paper elevation={3}>
          <Box p={5}>
            <Typography sx={{ whiteSpace: "pre-wrap" }}>{fileContent.content}</Typography>
          </Box>
        </Paper> :
        <ErrorInfo error={error} />
      }
    </>
  );
}