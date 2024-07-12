"use server"

import { ErrorInfoProps } from "@/components/error-info";
import { fileSystemApi } from "@/shared/api/file-system-api";

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

export type DeleteActionState = {
  message: string, 
  error: ErrorInfoProps,
};

export async function deleteFileSystemObject(prevState: DeleteActionState, formData: FormData) {
  console.log("delete")
  console.dir(formData);
  // const response = await fileSystemApi.delete();
  return { message: "Done", error: {status: 0, title: "", detail: "", type: "", instance: ""} as ErrorInfoProps };
}