import { LectureForm } from "@/components/LectureForm";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="flex flex-col justify-center mt-14 gap-6 max-w-3xl mx-auto p-6">
      <header className="flex flex-col gap-6 justify-center items-center">
        <Logo />
        <p className="text-gray-500 text-center leading-7">
          Crea cuestionarios con inteligencia artificial a partir de artículos
          web de forma rápida y precisa.
          <br />
          ¡Aprende más con cada lectura!
        </p>
      </header>
      <main>
        <LectureForm />
      </main>
    </div>
  );
}
