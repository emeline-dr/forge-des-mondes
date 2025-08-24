'use client'

import Image from "next/image";
import Link from 'next/link';

import AnimatedText from "@/components/AnimatedText";
import ThemeSwitch from '@/components/ThemeSwitch';
import { RegisterForm } from "@/components/forms/RegisterForm";

export default function Register() {
    return (
        <div className="screenPage w-full flex flex-col lg:flex-row flex-wrap items-start lg:items-center justify-start lg:justify-center gap-[40px] lg:gap-[80px] bg-linear-to-b from-accent dark:from-dark-accent to-secondary dark:to-dark-secondary">
            <ThemeSwitch />
            <div className="w-full lg:w-1/3 h-fit md:p-[40px] md:gap-[40px] flex justify-center flex-wrap">
                <Image
                    src="/images/forge-icon.png"
                    alt=""
                    width="250"
                    height="250"
                    className="mix-blend-luminosity drop-shadow-[0px_0px_4px_var(--color-text)] dark:drop-shadow-[0px_0px_4px_var(--color-dark-text)]"
                />
                <p className="hidden md:block relative bg-background dark:bg-dark-background p-[32px] rounded-sm shadow-md/20 shadow-text dark:shadow-dark-text">
                    <span className="absolute top-[8px] right-[8px] text-[8px] italic">Image par Freepik</span>
                    La <i>Forge des Mondes</i> est un outil réservé à tout écrivain : du rôliste au romancier.
                    Il lui permet de gérer les univers qu&apos;il crée, de les partager et de les nourrir, soit grâce à de nouvelles informations,
                    soit en créant des personnages vivant - ou survivant - dans ce monde.
                    <br /><br />
                    Si vous avez déjà un compte, nul besoin de s&apos;inscrire à nouveau ! Il n&apos;y a qu&apos;à <Link href="/login" className="tracking-wider font-amarante text-sm underline font-semibold text-primary dark:text-dark-primary hover:bg-primary dark:hover:bg-dark-primary hover:text-accent dark:hover:text-dark-accent hover:p-[4px] hover:rounded-sm">se connecter !</Link>
                </p>
            </div>

            <div className="lg:w-1/3 h-fit mx-auto mb-[40px] lg:mb-0 lg:mx-0 p-[40px] rounded-sm text-background dark:text-dark-text bg-primary-65 dark:bg-dark-primary-65">
                <h1 className="font-amarante text-2xl text-center">
                    <AnimatedText text="Nous" />
                    <span className="ms-[8px]">
                        <AnimatedText text="rejoindre" />
                    </span>
                </h1>
                <RegisterForm />
            </div>
        </div>
    );
}
