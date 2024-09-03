"use client";

import { useHome } from "@/hooks/use-home";
import React from "react";

export const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`${className} max-w-6xl mx-auto h-full px-3`}>{children}</div>;
};

export const HomeClient = ({ children }: { children: React.ReactNode }) => {
  const { closeNav, nav } = useHome();
  const onClick = () => {
    if (nav) closeNav();
  };
  return (
    <div onClick={onClick} className="grow">
      <Container>
        <div className="min-h-[calc(100vh-4rem)]">{children}</div>
      </Container>
    </div>
  );
};
