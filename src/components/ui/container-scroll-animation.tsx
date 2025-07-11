"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
  scrollYProgress?: MotionValue<number>; // Memungkinkan prop dari luar
}

export const ContainerScroll: React.FC<ContainerScrollProps> = ({
  titleComponent,
  children,
  scrollYProgress: externalScrollYProgress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Gunakan scrollYProgress dari luar jika disediakan
  const { scrollYProgress: internalScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Prioritaskan scroll dari luar jika ada
  const scrollYProgress = externalScrollYProgress || internalScrollYProgress;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  // Range yang lebih pendek untuk animasi yang lebih terlihat
  const rotate = useTransform(scrollYProgress, [0, 0.3], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
