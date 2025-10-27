import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
  showTitle?: boolean;
};

const CoverImage = ({ title, src, slug, showTitle = false }: Props) => {
  const imageContent = (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={`Cover Image for ${title}`}
        className={cn("object-cover w-full h-full", {
          "hover:scale-105 transition-transform duration-300": slug,
        })}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {showTitle && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex items-center justify-center">
          <div className="text-center px-6">
            <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
              {title}
            </h3>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title} className="block">
          {imageContent}
        </Link>
      ) : (
        imageContent
      )}
    </div>
  );
};

export default CoverImage;