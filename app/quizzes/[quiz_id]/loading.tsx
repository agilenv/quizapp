import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full space-y-6 p-6 max-w-4xl">
      <Skeleton className="h-28 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
      <div className="flex flex-col md:flex-row md:justify-around w-full gap-6 items-center">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-12 w-1/3" />
      </div>
    </div>
  );
}
