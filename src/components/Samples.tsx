"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { PHONES } from "@/constants";
import { cn, splitArray } from "@/lib/utils";
import Phone from "./Phone";

interface SampleImageProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

const SampleImage = ({ imgSrc, className, ...props }: SampleImageProps) => {
  const POSSIBLE_ANIMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  return (
    <div
      className={cn(
        "animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <Phone imgSrc={imgSrc} />
    </div>
  );
};

type SampleColumnProps = {
  samples: string[];
  className?: string;
  sampleClassName?: (sampleIndex: number) => string;
  msPerPixel?: number;
};

const SampleColumn = ({
  samples,
  className,
  sampleClassName,
  msPerPixel = 0,
}: SampleColumnProps) => {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  // Get height of column
  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {samples.concat(samples).map((imgSrc, sampleIndex) => (
        <SampleImage
          key={sampleIndex}
          className={sampleClassName?.(sampleIndex % samples.length)}
          imgSrc={imgSrc}
        />
      ))}
    </div>
  );
};

const SampleGrid = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Start animation once in view
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  // Define colums to display
  const columns = splitArray(PHONES, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 h-[49rem] max-h-[150vh] grid grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView ? (
        <>
          <SampleColumn
            samples={[...column1, ...column3.flat(), ...column2]}
            sampleClassName={(sampleIndex) =>
              cn({
                "md:hidden": sampleIndex >= column1.length + column3[0].length,
                "lg:hidden": sampleIndex >= column1.length,
              })
            }
            msPerPixel={10}
          />
          <SampleColumn
            samples={[...column2, ...column3[1]]}
            className="hidden md:block"
            sampleClassName={(sampleIndex) =>
              sampleIndex >= column2.length ? "lg:hidden" : ""
            }
            msPerPixel={15}
          />
          <SampleColumn
            samples={column3.flat()}
            className="hidden md:block"
            msPerPixel={10}
          />
        </>
      ) : null}
      <div className="pointer-event-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
      <div className="pointer-event-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
    </div>
  );
};

const Samples = () => {
  return (
    <MaxWidthWrapper classes="relative max-w-5xl">
      <Image
        aria-hidden="true"
        src="/what-people-are-buying.png"
        width={200}
        height={200}
        className="absolute select-none hidden xl:block -left-32 top-1/3"
        alt="samples"
      />
      <SampleGrid />
    </MaxWidthWrapper>
  );
};

export default Samples;
