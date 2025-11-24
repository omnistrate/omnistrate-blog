import { Container } from "@/app/components/container";
import { DisplayLG, TextMD } from "@/components/text";

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
      <Container className="py-12 md:py-18 lg:py-24">
        <TextMD className="text-center font-semibold text-[#202939] mb-3">Case Study</TextMD>
        <DisplayLG className="text-center font-semibold tracking-tight text-[#181D27] max-w-4xl mx-auto">
          {title}
        </DisplayLG>
      </Container>
    </div>
  );
};
