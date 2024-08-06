import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className={"flex flex-col w-full p-6 max-w-2xl"}>
      <Skeleton className={"h-16 w-full"}></Skeleton>
      <Skeleton
        className={"h-52 w-52 pt-10 my-20 rounded-full mx-auto"}
      ></Skeleton>
      <Skeleton className={"h-16 w-full max-w-40 mx-auto"}></Skeleton>
    </div>
  );
}
