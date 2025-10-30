import { cn } from "@/lib/utils";

export const Container: React.FC<React.ComponentProps<"div">> = (props) => {
  return <div {...props} className={cn("mx-auto px-6", props.className)} style={{ maxWidth: '1280px' }} />;
};