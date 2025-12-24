"use client";

import Image from "next/image";

interface BatikBackgroundProps {
    opacity?: number;
    className?: string;
}

export default function BatikBackground({
    opacity = 0.08,
    className = ""
}: BatikBackgroundProps) {
    return (
        <>
            {/* Fixed background layer dengan multiple patterns */}
            <div
                className={`fixed inset-0 -z-10 pointer-events-none overflow-hidden ${className}`}
                style={{ opacity }}
            >
                {/* Pattern 1 - Top Left */}
                <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rotate-0">
                    <Image
                        src="/batik-pattern.png"
                        alt=""
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Pattern 2 - Top Right */}
                <div className="absolute -top-45 right-0 w-[550px] h-[550px] rotate-0">
                    <Image
                        src="/batik-pattern.png"
                        alt=""
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Pattern 3 - Middle Left */}
                <div className="absolute top-[35%] -left-32 w-[450px] h-[450px] rotate-0">
                    <Image
                        src="/batik-pattern.png"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Pattern 4 - Middle Right */}
                <div className="absolute top-[5%] -right-60 w-[500px] h-[500px] rotate-0">
                    <Image
                        src="/batik-pattern.png"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Pattern 5 - Bottom Left */}
                <div className="absolute -bottom-5 left-30 w-[300px] h-[300px] rotate-0">
                    <Image
                        src="/batik-pattern.png"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Pattern 6 - Bottom Right */}
                <div className="absolute -bottom-20 -right-28 w-[520px] h-[520px] rotate-0">
                    <Image
                        src="/batik-pattern.png"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Pattern 7 - Center (subtle) */}
                <div className="absolute top-[-10%] left-[30.5%] w-[750px] h-[750px] rotate-0">
                    <Image
                        src="/pat1.png"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Pattern 7 - Center (subtle) */}
                <div className="absolute top-[10%] left-[42%] w-[300px] h-[300px] rotate-0">
                    <Image
                        src="/pat4.png"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Pattern 8 - Top Center (small accent) */}
                <div className="absolute top-50 left-[10%] w-[300px] h-[300px] rotate-0">
                    <Image
                        src="/batik-pattern.png"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Pattern 9 - Bottom Center (small accent) */}
                <div className="absolute bottom-16 left-[55%] w-[350px] h-[350px] rotate-0">
                    <Image
                        src="/batik-pattern.png"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="absolute top-[40%] left-[75%] w-[300px] h-[300px] rotate-0">
                    <Image
                        src="/batik-pattern.png"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="absolute top-80 right-240 w-[550px] h-[550px] rotate-0">
                    <Image
                        src="/batik-pattern.png"
                        alt=""
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="absolute top-175 right-220 w-[450px] h-[450px] rotate-0">
                    <Image
                        src="/batik-pattern.png"
                        alt=""
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Overlay gradient untuk blending yang lebih baik */}
            <div
                className="fixed inset-0 -z-10 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 30% 20%, rgba(220, 38, 38, 0.03) 0%, transparent 50%),
                                 radial-gradient(circle at 70% 60%, rgba(127, 45, 31, 0.04) 0%, transparent 50%),
                                 radial-gradient(circle at 50% 90%, rgba(107, 39, 24, 0.03) 0%, transparent 50%)`
                }}
            />
        </>
    );
}
