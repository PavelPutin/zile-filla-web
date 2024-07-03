import Breadcrumb from "@/components/breadcrumb";
import { Breadcrumbs } from "@mui/material";

export default function Page({ params }: { params: { dir_path?: string[] } }) {
  const pathElements = [""];
  (params.dir_path ?? []).forEach((value) => pathElements.push(value));
  const breadcrumbs = pathElements.map((value, index) => {
    const key = value + index;
    const last = index === pathElements.length - 1
    const href = pathElements.slice(0, index + 1).join("/");
    return Breadcrumb(key, value, last, href);
  });

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs}
    </Breadcrumbs>
  );
}