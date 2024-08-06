"use client";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Rank({
  numOfCorrectAnswers,
  totalQuestions,
  score,
  link,
  title,
  cheerUpMsg,
}: {
  numOfCorrectAnswers: number;
  totalQuestions: number;
  score: number;
  link: string;
  title: string;
  cheerUpMsg: string;
}) {
  const chartData = [
    {
      category: "Incorrectas",
      num: totalQuestions - numOfCorrectAnswers,
      fill: "var(--color-wrong)",
    },
    {
      category: "Correctas",
      num: numOfCorrectAnswers,
      fill: "var(--color-right)",
    },
  ];

  const chartConfig = {
    right: {
      label: "Correctas",
      color: "hsl(var(--chart-2))",
    },
    wrong: {
      label: "Incorrectas",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col border-0 shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center leading-8 hover:text-blue-800">
          <Link href={link} target="_blank" rel="noreferrer noopener">
            {title}
          </Link>
        </CardTitle>
        <CardDescription className={"py-2"}>
          Resultado del cuestionario
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="num"
              nameKey="category"
              innerRadius={90}
              strokeWidth={1}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {score.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Puntaje
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-6 text-sm">
        <div className="flex items-center text-center px-8 gap-4 font-medium leading-none">
          {cheerUpMsg}
        </div>
        <Button size="lg" className={"mt-6"} asChild>
          <Link href="/">Volver al inicio</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
