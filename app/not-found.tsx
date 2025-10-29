"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, styled } from "@mui/material";

import fourZeroFourImg from "@/public/not-found/404.png";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionComponents";
import { Container } from "./components/container";

const Description = styled("p")(() => ({
  color: "#475467",
  fontSize: "20px",
  lineHeight: "30px",
  marginTop: "16px",
  maxWidth: "592px",
  marginInline: "auto",
  textAlign: "center"
}));

const NotFoundPage = () => {
  return (
    <Container className="pb-10 lg:pb-16">
      <Box>
        <Image
          src={fourZeroFourImg}
          alt="sign-up"
          style={{
            maxWidth: 300,
            height: "auto",
            display: "block",
            margin: "auto"
          }}
        />
      </Box>

      <Box
        sx={{
          textAlign: "center",
          maxWidth: "592px",
          align: "center",
          display: "block",
          margin: "auto"
        }}
      >
        <SectionHeading sx={{ maxWidth: "592px", marginTop: "40px", textAlign: "center" }}>
          Looks like you&apos;ve found the doorway to the great nothing. <br />
        </SectionHeading>

        <Description>
          Please visit our homepage to get where you need to go. <br />
        </Description>

        <Link href="/">
          <Button style={{ marginTop: "40px" }} variant="omni-default" size="omni-default">
            Take me there
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
