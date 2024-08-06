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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lecture, LinkLecture } from "@/features/quiz/domain/lectures";
import { LectureTitle } from "@/components/LectureTitle";
import { ScoreMessage } from "@/components/ScoreMessage";

export function Rank({
  numOfCorrectAnswers,
  totalQuestions,
  score,
  lecture,
  onPlayAgain,
}: {
  numOfCorrectAnswers: number;
  totalQuestions: number;
  score: number;
  lecture: Lecture;
  onPlayAgain: () => void;
}) {
  const [link, setLink] = useState<string>("");

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
          <LectureTitle link={(lecture as LinkLecture).getLink()} />
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
        <ScoreMessage score={score} />
        <div className="my-4 flex flex-col md:flex-row gap-6">
          <Button
            size="lg"
            className={"order-2 md:order-1"}
            variant={"secondary"}
            onClick={onPlayAgain}
          >
            Probar de nuevo
          </Button>
          <Button size="lg" className={"order-1 md:order-2"} asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

const scoreMessages: { [key: string]: string[] } = {
  "0-10": [
    "No te preocupes, sigue practicando y mejorarás.",
    "Ánimo, con más esfuerzo podrás mejorar tu puntaje.",
  ],
  "11-20": [
    "No está mal, pero puedes hacerlo mucho mejor.",
    "Buen intento, sigue estudiando para subir tu puntaje.",
  ],
  "21-30": [
    "Estás en buen camino, sigue así.",
    "Sigue trabajando, tu esfuerzo dará frutos.",
  ],
  "31-40": [
    "Buen trabajo, pero aún puedes mejorar.",
    "Estás avanzando, sigue practicando y verás resultados.",
  ],
  "41-50": [
    "Buen progreso, sigue así para mejorar.",
    "Estás mejorando, sigue así y verás grandes resultados.",
  ],
  "51-60": [
    "Muy bien, estás en el camino correcto.",
    "Buen trabajo, estás a mitad de camino.",
  ],
  "61-70": [
    "Muy bien hecho, sigue así para perfeccionarte.",
    "Gran progreso, sigue esforzándote para alcanzar más.",
  ],
  "71-80": [
    "Excelente trabajo, casi estás en la cima.",
    "Muy bien, tu esfuerzo está dando resultados.",
  ],
  "81-90": [
    "Fantástico, casi has alcanzado la perfección.",
    "Impresionante, estás muy cerca de la perfección.",
  ],
  "91-100": [
    "¡Increíble! Has alcanzado la excelencia.",
    "Perfecto, has demostrado un dominio completo del tema.",
  ],
};

function getMessageForScore(score: number): string {
  if (score <= 10)
    return scoreMessages["0-10"][
      Math.floor(Math.random() * scoreMessages["0-10"].length)
    ];
  if (score <= 20)
    return scoreMessages["11-20"][
      Math.floor(Math.random() * scoreMessages["11-20"].length)
    ];
  if (score <= 30)
    return scoreMessages["21-30"][
      Math.floor(Math.random() * scoreMessages["21-30"].length)
    ];
  if (score <= 40)
    return scoreMessages["31-40"][
      Math.floor(Math.random() * scoreMessages["31-40"].length)
    ];
  if (score <= 50)
    return scoreMessages["41-50"][
      Math.floor(Math.random() * scoreMessages["41-50"].length)
    ];
  if (score <= 60)
    return scoreMessages["51-60"][
      Math.floor(Math.random() * scoreMessages["51-60"].length)
    ];
  if (score <= 70)
    return scoreMessages["61-70"][
      Math.floor(Math.random() * scoreMessages["61-70"].length)
    ];
  if (score <= 80)
    return scoreMessages["71-80"][
      Math.floor(Math.random() * scoreMessages["71-80"].length)
    ];
  if (score <= 90)
    return scoreMessages["81-90"][
      Math.floor(Math.random() * scoreMessages["81-90"].length)
    ];
  return scoreMessages["91-100"][
    Math.floor(Math.random() * scoreMessages["91-100"].length)
  ];
}
