"use client";

import { useEffect, useState, useRef } from "react";

interface CounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
}

export function Counter({ end, duration = 2000, suffix = "", prefix = "" }: CounterProps) {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function (easeOutExpo)
            const easeOut = (x: number): number => {
                return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
            };

            setCount(Math.floor(easeOut(progress) * end));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [end, duration, isVisible]);

    return (
        <span ref={countRef} className="tabular-nums">
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}
