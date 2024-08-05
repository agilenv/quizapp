import { LectureForm } from "@/components/LectureForm";
import Logo from "@/components/Logo";
import Guideness from "@/components/Guideness";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="bg-gray-100 h-svh flex flex-col overflow-y-auto">
      <div className="flex flex-col h-full justify-center gap-6 mx-auto p-6 bg-white w-full flex-2">
        <header className="flex flex-col gap-6 justify-center items-center">
          <Logo />
          <div className="text-gray-500 text-center leading-7">
            <h1 className="text-gray-500 text-center leading-7">
              Crea cuestionarios con inteligencia artificial a partir de
              artículos web de forma rápida y precisa.
            </h1>
            <p>¡Aprende más con cada lectura!</p>
          </div>
        </header>
        <main>
          <LectureForm />
        </main>
      </div>
      <footer className={"flex-1"}>
        <Separator />
        <Guideness />
      </footer>
    </div>
  );
}
