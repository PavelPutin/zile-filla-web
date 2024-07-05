"use client"

import FileBreadcrumbs from "./file-breadcrumbs";

export default function Explorer({ pathElements } : { pathElements: string[] }) {
  return (
    <>
      <FileBreadcrumbs pathElements={pathElements} />
      <h2>View</h2>
    </>
  );
}