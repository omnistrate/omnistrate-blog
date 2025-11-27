"use client";

import YouTube from "react-youtube";

type YouTubeEmbedProps = {
  videoId: string;
};

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
  return (
    <div className="my-8 w-full">
      <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden">
        <div className="absolute inset-0">
          <YouTube
            videoId={videoId}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 0
              }
            }}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
