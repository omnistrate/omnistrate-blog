import { Container } from "@/app/components/container";
import { DisplayLG, TextMD, TextSM } from "@/components/text";
import { Home } from "lucide-react";
import Link from "next/link";

type CaseStudyPostHeaderProps = {
  title: string;
};

export const CaseStudyPostHeader: React.FC<CaseStudyPostHeaderProps> = ({ title }) => {
  return (
    <div
      className="bg-[#FAFAFA]"
      style={{
        backgroundImage: `url('/case-study-posts/background.svg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Container className="pt-6 md:pt-8">
        <Link
          href="/"
          className="block w-fit rounded-full mb-2 md:mb-6 lg:mb-12 bg-gradient-to-t from-[#FFFFFF] to-[#FFFFFF1F] p-0.5 shadow-[0_1px_2px_0_#0A0D120D]"
        >
          <div className="flex items-center py-2 px-3 bg-[#121926] rounded-full">
            <Home className="w-5 h-5 mr-1.5 text-[#FFFFFF]" />
            <TextSM className="font-semibold text-[#FFFFFF]">Blog</TextSM>
          </div>
        </Link>
        <div className="pb-12 md:pb-18 lg:pb-24">
          <TextMD className="text-center font-semibold text-[#202939] mb-3">Case Study</TextMD>
          <DisplayLG className="text-center font-semibold tracking-tight text-[#181D27] max-w-4xl mx-auto">
            {title}
          </DisplayLG>
        </div>
      </Container>
    </div>
  );
};
