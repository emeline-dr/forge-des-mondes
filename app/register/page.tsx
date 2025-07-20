'use client'

import AnimatedText from "@/components/AnimatedText";
import ThemeSwitch from '@/components/ThemeSwitch';

export default function Register() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-background dark:bg-dark-background">
            <ThemeSwitch />
            <div className="z-2 p-[40px] rounded-sm text-5xl uppercase font-amarante text-text dark:text-dark-text bg-accent dark:bg-dark-accent">
                <h1>
                    <AnimatedText text="S'inscrire" />
                </h1>
            </div>

            <span className='absolute bottom-[8px] right-[8px] z-2 text-[8px] text-background dark:text-dark-text'>
                Image créée par Freepik
            </span>
        </div>
    );
}
