import TableCell from "@mui/material/TableCell";
import { Component, ReactNode } from "react";

export default function FixedTableCell({ children }: { children: string | ReactNode }) { 
  return <TableCell sx={{ width: 250 }}>{children}</TableCell>;
}