'use client'

import AnimatedText from "@/components/AnimatedText";
import { LoginForm } from "@/components/forms/LoginForm";

export default function Login() {
    return (
        <div className="screenPage w-full flex items-center justify-center bg-linear-to-b from-accent dark:from-dark-accent to-secondary dark:to-dark-secondary">
            <div className="z-2 p-[40px] rounded-sm text-background dark:text-dark-background bg-primary dark:bg-dark-primary">
                <h1 className="font-amarante text-5xl">
                    <AnimatedText text="Connexion" />
                </h1>
                <LoginForm />
            </div>
        </div>
    );
}
