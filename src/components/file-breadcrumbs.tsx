import Breadcrumb from "@/components/breadcrumb";
import { addExplorerPrefix } from "@/shared/lib/path-utils";
import { Breadcrumbs } from "@mui/material";

export default function FileBreadcrumbs({ pathElements } : { pathElements: string[] }) {
  const breadcrumbs = pathElements.map((value, index) => {
    const key = value + index;
    const last = index === pathElements.length - 1
    const href = addExplorerPrefix(pathElements.slice(0, index + 1).join("/"));
    return Breadcrumb(key, value, last, href);
  });

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs}
    </Breadcrumbs>
  );
}