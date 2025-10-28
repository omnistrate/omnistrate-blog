import { FC, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const SectionContainer: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...otherProps }) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16", className)} {...otherProps}>
      {children}
    </div>
  );
};
