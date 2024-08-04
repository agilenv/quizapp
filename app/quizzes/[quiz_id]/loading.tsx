import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-white w-full max-w-4xl">
      <Skeleton className="h-[100px] w-[850px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-12 w-[850px]" />
        <Skeleton className="h-12 w-[850px]" />
        <Skeleton className="h-12 w-[850px]" />
        <Skeleton className="h-12 w-[850px]" />
      </div>
      <div className="flex flex-row gap-6 justify-around w-full">
        <Skeleton className="h-12 w-[250px]" />
        <Skeleton className="h-12 w-[250px]" />
      </div>
    </div>
  );
}
