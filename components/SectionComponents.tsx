import { FC, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { styled } from "@mui/material";

export const SectionContainer: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...otherProps }) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16", className)} {...otherProps}>
      {children}
    </div>
  );
};

export const SectionHeading = styled("h1")(({ theme }) => ({
  fontWeight: 700,
  fontSize: 36,
  lineHeight: "44px",
  color: "#212121",
  textAlign: "center",
  [theme.breakpoints.down("lg")]: {
    fontSize: 32,
    lineHeight: "40px"
  },
  [theme.breakpoints.down("md")]: {
    fontSize: 24,
    lineHeight: "32px",
    fontWeight: 800
  }
}));
