import FileBreadcrumbs from "@/components/file-breadcrumbs";

export default function Page({ params }: { params: { dir_path?: string[] } }) {
  const pathElements = [""];
  (params.dir_path ?? []).forEach((value) => pathElements.push(value));

  return (
    <FileBreadcrumbs pathElements={pathElements} />
  );
}