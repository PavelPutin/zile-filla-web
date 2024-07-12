"use server"

export async function renameFileSystemObject(prevState: { message: string }, formData: FormData) {
  console.log(`process data`);
  console.dir(formData);
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log("Done");
  return { message: "Done" };
} 