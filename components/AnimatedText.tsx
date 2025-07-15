"use client";

import { useEffect } from "react";
import { animate } from 'animejs';

interface AnimatedTextProps {
    text: string;
}

export default function AnimatedText({ text }: AnimatedTextProps) {
    useEffect(() => {
        animate("span", {
            y: [
                { to: "-1rem", ease: "easeInOutSine", duration: 100 },
                { to: 0, ease: "easeOutBounce", duration: 800 },
            ],
            delay: (_, i) => i * 100,
            ease: "inOutCirc",
        });
    }, []);

    return (
        <>
            {text.split("").map((char, idx) => (
                <span key={idx} className="inline-block">
                    {char}
                </span>
            ))}
        </>
    );
}
