import React from "react";

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div
      className={`mx-auto w-full max-w-[1280px] px-5 md:px-10 md:pt-5 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};
