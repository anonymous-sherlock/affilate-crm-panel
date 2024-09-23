"use client";

import Image from "next/image";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import overlay from "@/public/card-overlay-1.svg";

type AnlayticsCardProps = {
  title: string;
  description: string;
  value: number;
  progress: number;
};

export default function AnlayticsCard() {
  return (
    <Card className="relative overflow-hidden border border-card-border shadow-card-shadow">
      <div className="absolute right-0 top-0 w-24">
        <Image src={overlay} alt="overlay" />
      </div>
      <CardHeader className="pb-2">
        <CardDescription>This Week</CardDescription>
        <CardTitle className="text-4xl">$1,329</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">+25% from last week</div>
      </CardContent>
      <CardFooter>
        <Progress value={25} aria-label="25% increase" />
      </CardFooter>
    </Card>
  );
}
