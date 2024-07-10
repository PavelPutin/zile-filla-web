import { Typography } from "@mui/material";
import Link from "next/link";

export default function Breadcrumb(key: string, value: string, last: boolean, href: string) {
  const title = value === "" ? "Начало" : value;
  href = href === "" ? "/" : href;

  if (last) {
    return <Typography key={key} color={"#c7649d"}>{title}</Typography>;
  }

  return <Typography key={key}><Link href={href}>{title}</Link></Typography>;
}