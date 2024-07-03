"use client"

import FileBreadcrumbs from "@/components/file-breadcrumbs";
import { fileSystemApi } from "@/shared/api/mock-file-system-api";
import { FileSystemObject } from "@/shared/model/file-system-object";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { dir_path?: string[] } }) {
  const pathElements = [""];
  (params.dir_path ?? []).forEach((value) => pathElements.push(value));

  const [fileSystemObjects, setFileSystemObjects] = useState<FileSystemObject[]>([]);
  useEffect(() => {
    const fetchFileSystemObjects = async () => {
      console.log("hello");
      try {
        const response = await fileSystemApi.changeDirectory("/");
        console.log("world");
        console.log(response);
        if (response === undefined) {
          notFound();
        }
        setFileSystemObjects(response);
        console.log(fileSystemObjects);
      } catch {
        console.log("response with error");
      }
    }
    fetchFileSystemObjects();
  }, []);

  return (
    <>
      <FileBreadcrumbs pathElements={pathElements} />
      {/* <p>{fileSystemObjects[0].name}</p> */}
    </>
  );
}