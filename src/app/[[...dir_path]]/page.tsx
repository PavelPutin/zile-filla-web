import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";

export default function Page({ params }: { params: { dir_path?: string[] } }) {
  const pathElements = ["Начало"];
  (params.dir_path ?? []).forEach((value) => pathElements.push(value));
  const breadcrumbs = pathElements.map((value, index) => {
    if (index === pathElements.length - 1) {
      return <Typography color="red">{value}</Typography>
    }
    return <Link key={index} href="/">{value}</Link>
  })

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs}
    </Breadcrumbs>
  );
}