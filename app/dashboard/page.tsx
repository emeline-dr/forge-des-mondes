import AnimatedText from "@/components/AnimatedText";

export default async function Dashboard() {
    return (
        <div className="screenPage w-full flex items-center justify-center bg-linear-to-b from-accent dark:from-dark-accent to-secondary dark:to-dark-secondary">
            <div className="z-2 p-[40px] rounded-sm font-amarante text-background dark:text-dark-background bg-primary dark:bg-dark-primary">
                <h1 className="text-5xl">
                    <AnimatedText text="Accueil connecté !" />
                </h1>
            </div>
        </div>
    );
}