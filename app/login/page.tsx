'use client'

import AnimatedText from "@/components/AnimatedText";

export default function Login() {
    return (
        <div className="screenPage w-full flex items-center justify-center bg-secondary dark:bg-dark-secondary">
            <div className="z-2 p-[40px] rounded-sm text-5xl uppercase font-amarante text-background dark:text-dark-background bg-primary dark:bg-dark-primary">
                <h1>
                    <AnimatedText text="Connexion" />
                </h1>
            </div>
        </div>
    );
}
