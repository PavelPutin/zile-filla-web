import View from "@/components/view";

export default async function Page({ params }: { params: { dir_path?: string[] } }) {
  const pathElements = [""];
  (params.dir_path ?? []).forEach((value) => pathElements.push(value));
  return (
    <>
      <View pathElements={pathElements}/>
    </>
  );
}