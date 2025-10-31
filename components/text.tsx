import { cn } from "@/lib/utils";

export const TextXS = (props: React.ComponentProps<"p">) => {
  return <p {...props} className={cn("text-xs font-medium text-[#364152]", props.className)} />;
};

export const TextSM = (props: React.ComponentProps<"p">) => {
  return <p {...props} className={cn("text-sm font-normal text-[#535862]", props.className)} />;
};

export const TextMD = (props: React.ComponentProps<"p">) => {
  return <p {...props} className={cn("text-sm md:text-md font-semibold text-[#202939]", props.className)} />;
};

export const TextXL = (props: React.ComponentProps<"p">) => {
  return <p {...props} className={cn("text-lg md:text-xl font-semibold text-[#181D27]", props.className)} />;
};

export const DisplayLG = (props: React.ComponentProps<"h1">) => {
  return (
    <h1 {...props} className={cn("text-3xl sm:text-4xl md:text-5xl font-semibold text-[#181D27]", props.className)} />
  );
};

export const DisplayMD = (props: React.ComponentProps<"h2">) => {
  return (
    <h1 {...props} className={cn("text-2xl sm:text-3xl md:text-4xl font-semibold text-[#181D27]", props.className)} />
  );
};
