"use server"

import { ErrorInfoProps } from "@/components/error-info";
import { fileSystemApi } from "@/shared/api/file-system-api";
import { FileSystemObject } from "@/shared/model/file-system-object";

export type RenameActionState = {
  message: string, 
  newName: string,
  error: ErrorInfoProps,
};

export async function renameFileSystemObject(prevState: RenameActionState, formData: FormData) {
  try {
    const source = formData.get("source")?.toString();
    if (source === undefined) {
      throw {
        type: "/zile-filla/invalid-path",
        detail: "Неправильный путь",
        status: 400,
        title: "Неправильный путь",
        instance: "" 
      }
    }
    const fileName = formData.get("file-name")?.toString();
    if (fileName === undefined) {
      throw {
        type: "/zile-filla/invalid-path",
        detail: "Не удалось переименовать директорию, так как она не пустая",
        status: 400,
        title: "Неправильный путь",
        instance: "" 
      }
    }
  
    const response = await fileSystemApi.rename(source, fileName);
    return { message: "Done", newName: fileName, error: {status: 0, title: "", detail: "", type: "", instance: ""} as ErrorInfoProps };
  } catch (e) {
    return { message: "Error", newName: "", error: e as ErrorInfoProps };
  }
  
} 

export async function deleteFileSystemObject(filesToDelete: string[]) {
  console.log("delete")
  console.log(filesToDelete)
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  let errors: ErrorInfoProps[] = [];
  for (const value of filesToDelete) {
    try {
      const response = await fileSystemApi.delete(value);
    } catch (e) {
      errors.push(e as ErrorInfoProps);
    }
  };
  console.log("complete deleteFileSystemObject");
  if (errors.length > 0) {
    console.log(`Occured ${errors.length} errors`);
    throw errors;
  }
}

export async function moveFileSystemObject(sourceFiles: string[], destination: string) {
  console.log(`Batch move of ${sourceFiles.length} files`);
  let errors: ErrorInfoProps[] = [];
  for (const value of sourceFiles) {
    try {
      await fileSystemApi.move(value, destination);
    } catch (e) {
      errors.push(e as ErrorInfoProps);
    }
  };
  console.log("complete moveFileSystemObject");
  if (errors.length > 0) {
    console.log(`Occured ${errors.length} errors`);
    throw errors;
  }
}

export async function changeDirectory(path: string) {
  return await fileSystemApi.changeDirectory(path);
}
