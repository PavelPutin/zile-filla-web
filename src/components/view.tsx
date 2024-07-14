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
        <Paper elevation={5} sx={{ maxWidth: 1200, minHeight: 1697, margin: "0 auto" }}>
          <Box p={5}>
            {
              fileContent.content.split("\n").map((value, index) => <Typography key={`paragraph${index}`} sx={{ overflowWrap: "break-word" }} paragraph>{value}</Typography>)
            }

                
          </Box>
        </Paper>  :
        <ErrorInfo error={error} />
      }
    </>
  );
}