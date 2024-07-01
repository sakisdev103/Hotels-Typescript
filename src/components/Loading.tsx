import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="container my-4">
      {"abcdefghik".split("").map((index) => (
        <Card className="w-full sm:flex my-3" key={index}>
          <Skeleton className="w-full h-[270px] sm:w-[240px] sm:h-[240px] rounded-lg" />

          <CardContent className="w-full">
            <div className="flex justify-between gap-y-3">
              <Skeleton className="w-3/5 h-6" />
              <Skeleton className="w-1/5 h-6 " />
            </div>
            <div className="flex justify-between mt-10">
              <Skeleton className="w-3/6 h-6" />
              <Skeleton className="w-1/6 h-6" />
            </div>
            <div className="flex justify-between mt-10">
              <Skeleton className="w-3/6 h-20" />
              <Skeleton className="w-1/6 h-6" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default Loading;
