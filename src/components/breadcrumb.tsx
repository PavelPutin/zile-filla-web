import { Typography } from "@mui/material";
import Link from "next/link";

export default function Breadcrumb(key: string, value: string, last: boolean, href: string) {
  const title = value === "" ? "Начало" : value;
  href = href === "" ? "/" : href;

  if (last) {
    return <Typography key={key} color="red">{title}</Typography>
  }

  return <Link key={key} href={href}>{title}</Link>
}