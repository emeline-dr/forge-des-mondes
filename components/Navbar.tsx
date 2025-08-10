'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link';

import ThemeSwitch from '@/components/ThemeSwitch';

export default function Navbar() {
    const pathname = usePathname();
    return (
        <nav className='h-[64px] flex justify-between bg-accent dark:bg-dark-accent py-[16px] ps-[16px] pe-[64px]'>
            <Link href='/'>
                <div className='size-[32px] rounded-sm bg-background dark:bg-dark-text hover:invert'>
                    <Image
                        src="/images/fdm-logo.png"
                        alt="Logo Forge des Mondes"
                        width="32"
                        height="32"
                    />
                </div>
            </Link>

            {pathname == "/register" &&
                <Link href="/login">
                    <button type="button" className='h-[32px] px-[16px] rounded-sm cursor-pointer hover:bg-text hover:text-accent dark:hover:bg-dark-text dark:hover:text-dark-accent'>
                        Se connecter
                    </button>
                </Link>}

            {pathname == "/login" &&
                <Link href="/register">
                    <button type="button" className='h-[32px] px-[16px] rounded-sm cursor-pointer hover:bg-text hover:text-accent dark:hover:bg-dark-text dark:hover:text-dark-accent'>
                        {"S'inscrire"}
                    </button>
                </Link>}

            <ThemeSwitch />
        </nav>
    )
}