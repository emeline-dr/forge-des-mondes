"use client";

import { useEffect, useRef } from "react";
import { animate } from 'animejs';

interface AnimatedTextProps {
    text: string;
}

export default function AnimatedText({ text }: AnimatedTextProps) {
    const spansRef = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
        const spans = spansRef.current;

        const handleMouseEnter = (el: HTMLElement) => {
            animate(el, {
                scale: 1.5,
                duration: 250,
                easing: "easeInOutSine"
            });
        };

        const handleMouseLeave = (el: HTMLElement) => {
            animate(el, {
                scale: 1,
                duration: 500,
                easing: "easeOutBounce"
            });
        };

        spans.forEach((span) => {
            if (!span) return;
            const enter = () => handleMouseEnter(span);
            const leave = () => handleMouseLeave(span);

            span.addEventListener("mouseenter", enter);
            span.addEventListener("mouseleave", leave);

            // Cleanup on unmount
            return () => {
                span.removeEventListener("mouseenter", enter);
                span.removeEventListener("mouseleave", leave);
            };
        });
    }, []);

    return (
        <>
            {text.split("").map((char, idx) => (
                <span
                    key={idx}
                    ref={(el) => {
                        if (el) spansRef.current[idx] = el;
                    }}
                    className="inline-block cursor-pointer"
                >
                    {char}
                </span>
            ))}
        </>
    );
}
