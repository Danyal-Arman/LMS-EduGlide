import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
const CourseCardSkeleton = ()=> {
  return (
    <Card className=" w-[280px] md:w-[330px] lg:w-[300px]">
    <CardHeader className="space-y-4">
      {/* Course thumbnail skeleton */}
      <Skeleton className="h-40 w-full rounded-lg" />
      {/* Course title skeleton */}
      <Skeleton className="h-6 w-5/6" />
    </CardHeader>
    <CardContent className="space-y-4">
      {/* Instructor info skeleton */}
      <div className="flex items-center justify-between space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-[100px]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[80px]" />
        </div>
      </div>
      {/* Course description skeleton */} 
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </CardContent>
    
  </Card>
  );
}
export default CourseCardSkeleton
