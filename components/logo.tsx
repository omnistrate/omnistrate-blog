import Link from "next/link";
import Image from "next/image";
import { WEBSITE_URL } from "@/constants/site";

type LogoProps = {
  href?: string;
};

export const Logo: React.FC<LogoProps> = (props) => {
  const { href = WEBSITE_URL } = props;

  return (
    <Link href={href}>
      <Image
        src="/logos/logo.svg"
        width={142}
        height={34.3}
        alt="omnistrate-logo"
        priority
        style={{
          width: "100%",
          maxWidth: "142px",
          height: "auto"
        }}
      />
    </Link>
  );
};
