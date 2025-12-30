import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full">
      <CardHeader className="p-0">
        {/* Image skeleton */}
        <Skeleton className="h-48 w-full" />
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {/* Price skeleton */}
        <Skeleton className="h-6 w-32" />

        {/* Title skeleton */}
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />

        {/* Location skeleton */}
        <Skeleton className="h-4 w-full" />

        {/* Features skeleton */}
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}
