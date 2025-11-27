import { cn } from "@/lib/utils";

export const TextXS = (props: React.ComponentProps<"p">) => {
  return <p {...props} className={cn("text-xs font-medium text-[#364152]", props.className)} />;
};

export const TextSM = (props: React.ComponentProps<"p">) => {
  return <p {...props} className={cn("text-sm font-normal text-[#535862]", props.className)} />;
};

export const TextMD = (props: React.ComponentProps<"p">) => {
  return <p {...props} className={cn("text-sm md:text-base font-semibold text-[#202939]", props.className)} />;
};

export const TextMDBlock = (props: React.ComponentProps<"div">) => {
  return <div {...props} className={cn("text-sm md:text-base font-normal text-[#535862]", props.className)} />;
};

export const TextLG = (props: React.ComponentProps<"p">) => {
  return <p {...props} className={cn("text-base md:text-lg font-semibold text-[#181D27]", props.className)} />;
};

export const TextXL = (props: React.ComponentProps<"p">) => {
  return <p {...props} className={cn("text-lg md:text-xl font-semibold text-[#181D27]", props.className)} />;
};

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface DisplayProps extends Omit<React.ComponentProps<"h1">, "as"> {
  as?: HeadingLevel;
}

export const DisplayLG = ({ as: Component = "h1", ...props }: DisplayProps) => {
  return (
    <Component
      {...props}
      className={cn("text-3xl sm:text-4xl md:text-5xl font-semibold text-[#181D27] md:leading-14", props.className)}
    />
  );
};

export const DisplayMD = ({ as: Component = "h1", ...props }: DisplayProps) => {
  return (
    <Component
      {...props}
      className={cn("text-2xl sm:text-3xl md:text-4xl font-semibold text-[#181D27]", props.className)}
    />
  );
};

export const DisplaySM = ({ as: Component = "h1", ...props }: DisplayProps) => {
  return <Component {...props} className={cn("text-2xl sm:text-3xl font-bold text-[#181D27]", props.className)} />;
};

export const DisplayXS = ({ as: Component = "h1", ...props }: DisplayProps) => {
  return <Component {...props} className={cn("text-xl sm:text-2xl font-medium text-[#181D27]", props.className)} />;
};
