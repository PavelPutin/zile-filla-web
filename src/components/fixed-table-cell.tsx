import TableCell from "@mui/material/TableCell";

export default function FixedTableCell({ children }: { children: string }) { 
  return <TableCell sx={{ width: 250 }}>{children}</TableCell>;
}