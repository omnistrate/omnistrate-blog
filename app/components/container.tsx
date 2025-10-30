import { cn } from "@/lib/utils";

export const Container: React.FC<React.ComponentProps<"div">> = (props) => {
  return <div {...props} className={cn("max-w-7xl mx-auto px-6 md:px-8", props.className)} />;
};
