import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { formatPrice } from "@/lib/utils";

type DashboardCardProps = { sum: number; title: string; goal: number };

const DashboardCard = ({ sum, title, goal }: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{formatPrice(sum)}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          of {formatPrice(goal)} goal
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={(sum * 100) / goal} />
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
