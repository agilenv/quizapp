"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/context/QuizContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export function LectureForm() {
  const { generateFromLink, apiKey } = useQuiz();
  const router = useRouter();
  const { toast } = useToast();
  const { flush } = useQuiz();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    flush();
  }, []);

  const formSchema = z.object({
    lecture: z.string().url("La URL debe ser un enlace válido"),
    apiKey: z.string().min(1, "La clave de API no puede estar vacía"),
    numberOfQuestions: z.coerce.number().min(1).max(10),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lecture: "",
      apiKey: apiKey,
      numberOfQuestions: 4,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    generateFromLink(
      values.apiKey,
      values.lecture,
      values.numberOfQuestions,
    ).then((quiz) => router.push(`/quizzes/${quiz.getId()}`));
  }

  const onError = (errors: any) => {
    Object.values(errors).forEach((error: any) => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-4 mt-10"
      >
        <FormField
          name="apiKey"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder="OpenAI API Key"
                  className="border-gray-300 rounded-md shadow-sm"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center">
          <FormField
            name="lecture"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://example.com"
                    className="border-gray-300 rounded-md shadow-sm"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="numberOfQuestions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-baseline gap-2">
                <FormLabel className="font-bold">Preguntas</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    {...field}
                    className="w-16 border-gray-300 rounded-md shadow-sm"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full justify-center mt-6">
          <Button
            className="w-48 bg-orange-500 text-white rounded-md py-2 hover:bg-orange-600 transition-colors duration-300"
            type="submit"
            size="lg"
            disabled={isLoading}
          >
            Generar!
          </Button>
        </div>
      </form>
    </Form>
  );
}
