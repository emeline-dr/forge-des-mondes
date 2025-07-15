import AnimatedText from "@/components/AnimatedText";

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-accent dark:bg-dark-accent">
      <div className="text-5xl uppercase font-major-mono-display text-text dark:text-dark-text">
        <AnimatedText text="Forge" />
        <span className="mx-[40px]">
          <AnimatedText text="des" />
        </span>
          <AnimatedText text="Mondes" />
      </div>
    </div>
  );
}
