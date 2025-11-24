import React from "react";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";

import { cn } from "@/lib/utils";
import { Post } from "@/types/post";
import { Container } from "@/app/components/container";
import { DisplaySM, DisplayXS, TextLG, TextMD, TextMDBlock, TextSM } from "@/components/text";

type CaseStudyPostBodyProps = {
  post: Post;
};

export const CaseStudyPostBody: React.FC<CaseStudyPostBodyProps> = ({ post }) => {
  const { content = "" } = post;

  return (
    <div>
      <MDXRemote
        source={content}
        components={{
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-3"
              {...props}
            >
              {children}
            </a>
          ),
          GreenLink: ({ href, children, ...props }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38B601] underline underline-offset-3"
              {...props}
            >
              {children}
            </a>
          ),
          Section: ({ children, shadedbg, ...props }) => (
            <section {...props} className={cn(props.className, shadedbg && "bg-[#F8FAFC]", "py-12 md:py-18 lg:py-24")}>
              <Container>{children}</Container>
            </section>
          ),
          SectionHeading: ({ children, ...props }) => (
            <DisplaySM {...props} as="h2" className="font-semibold text-[#181D27] max-w-3xl mt-3">
              {children}
            </DisplaySM>
          ),
          SectionText: ({ children, ...props }) => (
            <TextMDBlock {...props} className={cn("max-w-3xl mt-5", props.className)}>
              {children}
            </TextMDBlock>
          ),
          SectionTopic: ({ children, ...props }) => (
            <TextLG {...props} className="text-[#202939] font-semibold max-w-3xl">
              {children}
            </TextLG>
          ),
          PointsBox: ({ points }: { points: { title: string; content: React.ReactNode }[] }) => {
            return (
              <div className="bg-[#13161B] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr border border-[#9AA4B2] shadow-[0_1px_2px_0_#0A0D120D] mt-8">
                {points.map((point, index) => (
                  <div
                    key={index}
                    className={cn(
                      "border-[#9AA4B2]",
                      index !== 0 && "border-t md:border-t-0",
                      index % 2 !== 0 && "md:border-l",
                      points.length > 2 && index < 2 && "md:border-b lg:border-b-0",
                      points.length === 3 && index >= 1 && "lg:border-l",
                      points.length === 4 && index % 4 !== 0 && "lg:border-l"
                    )}
                  >
                    <div className="px-4 py-5">
                      <TextLG className="text-[#F7F7F7] font-bold">{point.title}</TextLG>
                      <TextSM className="text-[#94979C] font-normal mt-3">{point.content}</TextSM>
                    </div>
                  </div>
                ))}
              </div>
            );
          },
          ContentBox: ({ items }: { items: React.ReactNode[] }) => {
            return (
              <div className=" min-h-[16.5rem] bg-[#13161B] grid grid-cols-1 md:grid-cols-3 border border-[#9AA4B2] shadow-[0_1px_2px_0_#0A0D120D] mt-8">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "border-[#9AA4B2] flex items-center justify-center h-full",
                      index !== 0 && "border-t md:border-t-0 md:border-l"
                    )}
                  >
                    <TextLG className="px-5 py-6 text-center text-[#F7F7F7] font-normal">{item}</TextLG>
                  </div>
                ))}
              </div>
            );
          },
          Testimonial: ({
            testimonial,
            author,
            role,
            imageUrl,
            roundedImage
          }: {
            testimonial: string;
            author: string;
            role: string;
            imageUrl: string;
            roundedImage?: boolean;
          }) => (
            <div className="mt-12 md:mt-16 grid grid-cols-1 gap-8 md:gap-0 md:grid-cols-7">
              <div className="flex flex-col justify-center sm:ml-8 lg:ml-16 md:col-span-5 mr-6 sm:mr-12 lg:mr-24 order-2 md:order-1">
                <DisplayXS className="text-[#181D27] font-medium italic mb-10">"{testimonial}"</DisplayXS>
                <TextLG className="font-semibold text-[#181D27] mb-1">— {author}</TextLG>
                <TextMD className="font-normal text-[#535862]">{role}</TextMD>
              </div>
              <div className="md:col-span-2 self-center order-1 md:order-2">
                {imageUrl && (
                  <div className="max-w-[20.5rem] mx-auto md:ml-auto">
                    <Image
                      src={imageUrl}
                      alt={author}
                      width={320}
                      height={320}
                      className={cn("w-full max-w-full h-auto object-cover", roundedImage && "rounded-lg")}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        }}
        options={{
          mdxOptions: {
            format: "mdx"
          }
        }}
      />
    </div>
  );
};
