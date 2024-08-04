import { LectureForm } from "@/components/LectureForm";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="flex flex-col justify-center mt-14 gap-6 max-w-4xl mx-auto">
      <header className="flex flex-col gap-6 justify-center items-center">
        <Logo />
        <p className="text-gray-500 text-center">
          Crea cuestionarios con IA a partir de artículos web de forma rápida y
          precisa. ¡Aprende más con cada lectura!
        </p>
      </header>
      <main>
        <LectureForm />
      </main>
    </div>
  );
}
