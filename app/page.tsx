'use client'

import Link from "next/link";

import AnimatedText from "@/components/AnimatedText";
import ThemeSwitch from '@/components/ThemeSwitch';

export default function Home() {

  return (
    <div className="screenPage w-full flex flex-col gap-[40px] items-center justify-center bg-accent dark:bg-dark-accent">
      <ThemeSwitch />
      <div className={`screenPage w-full absolute bg-[url('/images/planets-background.jpg')] dark:bg-[url('/images/planets-dark-bg.jpg')] bg-cover bg-center mix-blend-multiply`}></div>

      <div className="z-2 p-[40px] mx-[40px] rounded-sm text-5xl uppercase font-amarante text-text dark:text-dark-text bg-accent dark:bg-dark-accent">
        <h1 className="flex flex-wrap justify-center gap-x-[40px]">
          <span className="text-nowrap">
            <AnimatedText text="Forge" />
          </span>
          <span className="text-nowrap">
            <AnimatedText text="des" />
          </span>
          <span className="text-nowrap">
            <AnimatedText text="Mondes" />
          </span>
        </h1>
      </div>

      <div className="z-2 w-auto sm:w-1/2 lg:w-1/3 2xl:w-1/4 font-amarante text-lg flex flex-wrap justify-between gap-[24px]">
        <Link href="/login" className="w-full md:flex-1 bg-background dark:bg-dark-accent hover:bg-text hover:dark:bg-dark-text hover:text-accent hover:dark:text-dark-accent hover:outline-2 hover:outline-accent hover:dark:outline-dark-accent px-[32px] py-[8px] rounded-sm text-center">
          Se connecter
        </Link>

        <Link href="/register" className="w-full md:flex-1 bg-background dark:bg-dark-accent hover:bg-text hover:dark:bg-dark-text hover:text-accent hover:dark:text-dark-accent hover:outline-2 hover:outline-accent hover:dark:outline-dark-accent px-[32px] py-[8px] rounded-sm text-center">
          {"S'inscrire"}
        </Link>
      </div>

      <span className='absolute bottom-[8px] right-[8px] z-2 text-[8px] text-background dark:text-dark-text'>
        Image créée par Freepik
      </span>
    </div>
  );
}
