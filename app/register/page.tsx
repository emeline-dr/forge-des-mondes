'use client'

import Image from "next/image";

import AnimatedText from "@/components/AnimatedText";
import ThemeSwitch from '@/components/ThemeSwitch';

export default function Register() {
    return (
        <div className="screenPage w-full flex flex-col lg:flex-row flex-wrap items-start justify-start lg:justify-center gap-[40px] lg:gap-[80px] bg-linear-to-b from-accent dark:from-dark-accent to-secondary dark:to-dark-secondary">
            <ThemeSwitch />
            <div className="w-full lg:w-1/3 h-fit md:p-[40px] md:gap-[40px] flex justify-center flex-wrap">
                <Image
                    src="/images/forge-icon.png"
                    alt=""
                    width="250"
                    height="250"
                    className="mix-blend-luminosity"
                />
                <p className="hidden md:block bg-background dark:bg-dark-background text-sm p-[32px] rounded-sm shadow-md/20 shadow-text dark:shadow-dark-text">
                    La <i>Forge des Mondes</i> est un outil réservé à tout écrivain : du rôliste au romancier.
                    Il lui permet de gérer les univers qu&apos;il crée, de les partager et de les nourrir, soit grâce à de nouvelles informations,
                    soit en créant des personnages vivant - ou survivant - dans ce monde.
                </p>
            </div>
            <div className="lg:w-1/3 h-fit mx-[40px] lg:mx-0 p-[40px] rounded-sm text-background dark:text-dark-text bg-primary-65 dark:bg-dark-primary-65">
                <h1 className="font-amarante text-xl">
                    <AnimatedText text="S'inscrire" />
                </h1>
            </div>
        </div>
    );
}
