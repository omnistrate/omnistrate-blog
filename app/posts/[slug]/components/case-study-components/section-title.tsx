import { DisplaySM } from "@/components/text";

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return <DisplaySM className="mt-3 mb-5">{children}</DisplaySM>;
};
