"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, styled, Typography, useMediaQuery, useTheme } from "@mui/material";

import SocLogo from "@/public/footer/soc-logo.svg";
import fbLogo from "@/public/footer/fb.png";
import linkedinLogo from "@/public/footer/linkedin.png";
import twitterLogo from "@/public/footer/twitter.png";
import youtubeLogo from "@/public/footer/youtube.png";
import omnistrateLogo from "@/public/logos/omnistrate-logo-black-font.png";

import { API_DOCS_URL, PRODUCT_URL, SITE_URL, WEBSITE_URL, YOUTUBE_CHANNEL_URL } from "@/constants/site";
import { SectionContainer } from "./SectionComponents";
import { useCookieConsentContext } from "@/context/cookieConsentContext";

const Grid = styled("div", {
  shouldForwardProp: (prop) => prop !== "isBelowDesktop"
  // @ts-ignore
})(({ isBelowDesktop }) => ({
  display: "grid",
  gridTemplateColumns: isBelowDesktop ? "repeat(5, 1fr)" : "repeat(6, 1fr)",
  gap: 32,
  marginBottom: 20
}));

const Column = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start"
}));

const ColumnHeading = styled("h3")(() => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  marginBottom: 16,
  color: "#111827"
}));

const Cell = styled("span")(() => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  color: "#6B7280",
  "& + &": {
    marginTop: 12
  }
}));

const CellSocial = styled(Cell)(() => ({
  "& + &": {
    marginTop: 12
  }
}));

const SocialLogo = styled(Image)(() => ({
  height: "24px",
  width: "24px",
  marginRight: "12px"
}));

export const StyledLink = styled("a", {
  shouldForwardProp: (prop) => prop !== "styles"
  // @ts-ignore
})(({ styles }) => ({
  textDecoration: "none",
  transition: "color 0.2s",
  display: "flex",
  flexWrap: "wrap",
  color: "white",
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "24px",
  ...styles,
  "&:visited": {
    color: "white",
    textDecoration: "none"
  },

  "&:active": {
    color: "white",
    textDecoration: "none"
  },

  "&:hover": {
    color: "white",
    textDecoration: "none",
    cursor: "pointer"
  }
}));

const OmnistrateLogo = () => {
  return (
    <Image
      src={omnistrateLogo}
      alt="logo"
      style={{
        width: "100%",
        height: "auto",
        maxWidth: 142
      }}
    />
  );
};

const MobileNavList = styled("ul")({
  display: "flex",
  padding: "20px 12.5px 15px",
  justifyContent: "space-evenly",
  listStyleType: "none",
  margin: 0,
  gap: "8px"
});

const MobileFooter = () => {
  const { openCookieConsentModal } = useCookieConsentContext();

  return (
    <>
      <MobileNavList>
        <Link href="/terms">Terms of Service</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Box onClick={openCookieConsentModal} sx={{ cursor: "pointer" }}>
          Cookie Settings
        </Box>
      </MobileNavList>
      <Box textAlign="center" m="20px 0px">
        <Box mb="24px">
          <Image src={SocLogo} alt="soc logo" className="mx-auto" />
        </Box>
        <Typography fontSize="14px" lineHeight="20px" color="#9CA3AF">
          © {new Date().getFullYear()} Omnistrate, Inc. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

function Footer() {
  const theme = useTheme();
  const isBelowDesktop = useMediaQuery(theme.breakpoints.down("lg"));
  const isBelowTablet = useMediaQuery(theme.breakpoints.down("md"));

  const { openCookieConsentModal } = useCookieConsentContext();

  return (
    <footer>
      <SectionContainer className="border-t border-[#E9EAEB]">
        {isBelowTablet ? (
          <MobileFooter />
        ) : (
          <>
            {isBelowDesktop && (
              <Box mb="26px">
                <Link href="/">
                  <OmnistrateLogo />
                </Link>
              </Box>
            )}
            {/* @ts-ignore */}
            <Grid isBelowDesktop={isBelowDesktop}>
              {!isBelowDesktop && (
                <Column>
                  <Link href="/">
                    <OmnistrateLogo />
                  </Link>
                </Column>
              )}

              <Column>
                <ColumnHeading>Company</ColumnHeading>
                <Cell>
                  <Link href={`${WEBSITE_URL}/about`}>About us</Link>
                </Cell>
                <Cell>
                  <Link href={`${WEBSITE_URL}/contact`}>Contact us</Link>
                </Cell>
                <Cell>
                  <Link href={`${WEBSITE_URL}/careers`}>Careers</Link>
                </Cell>

                <Cell>
                  <Link href={`${WEBSITE_URL}/terms`}>Terms of Service</Link>
                </Cell>
                <Cell>
                  <Link href={`${WEBSITE_URL}/privacy-policy`}>Privacy Policy</Link>
                </Cell>
                <Cell>
                  <Box onClick={openCookieConsentModal} sx={{ cursor: "pointer" }}>
                    Cookie Settings
                  </Box>
                </Cell>
              </Column>
              <Column>
                <ColumnHeading>Product</ColumnHeading>
                <Cell>
                  <Link href={`${PRODUCT_URL}/signin`}>Sign in</Link>
                </Cell>
                <Cell>
                  <Link href={`${PRODUCT_URL}/signup`}>Sign up</Link>
                </Cell>
                <Cell>
                  <Link href={`${WEBSITE_URL}/pricing`}>Pricing</Link>
                </Cell>
                <Cell>
                  <Link href={`${WEBSITE_URL}/support`}>Support</Link>
                </Cell>
                <Cell>
                  <Link href="https://calendly.com/omnistrate/meeting" target="_blank">
                    Demo
                  </Link>
                </Cell>
              </Column>
              <Column>
                <ColumnHeading>Resources</ColumnHeading>
                <Cell>
                  <Link href="https://docs.omnistrate.com/" target="_blank">
                    Documentation
                  </Link>
                </Cell>
                <Cell>
                  <Link href={SITE_URL} target="_blank">
                    Engineering Blog
                  </Link>
                </Cell>
                <Cell>
                  <Link href={`${SITE_URL}/posts/51`} target="_blank">
                    Why Omnistrate?
                  </Link>
                </Cell>

                <Cell>
                  <Link href={`${WEBSITE_URL}/control-plane-demystified`}>Omnistrate, Demystified</Link>
                </Cell>

                <Cell>
                  <Link href={YOUTUBE_CHANNEL_URL} target="_blank">
                    Tutorials
                  </Link>
                </Cell>
                <Cell>
                  <Link href={API_DOCS_URL} target="_blank">
                    API Reference
                  </Link>
                </Cell>
              </Column>

              <Column>
                <ColumnHeading>Ecosystem</ColumnHeading>
                <Cell>
                  <Link href={`${WEBSITE_URL}/events`}>Events</Link>
                </Cell>

                <Cell>
                  <Link
                    href={`https://cloudnative-u5h1399.slack.com/join/shared_invite/zt-1qf3cgi37-lCV1vKJlrBioqGuVjKBtyw#/shared-invite/email`}
                    target="_blank"
                  >
                    Community
                  </Link>
                </Cell>
                <Cell>
                  <Link href={`${WEBSITE_URL}/partners`}>Partners</Link>
                </Cell>
                <Cell>
                  <Link href={`${WEBSITE_URL}/press-release`}>Press Release</Link>
                </Cell>
                <Cell>
                  <Link href={`${WEBSITE_URL}/aws-saas-offer`}>AWS SaaS Offer</Link>
                </Cell>
              </Column>
              <Column>
                <ColumnHeading>Social</ColumnHeading>
                <CellSocial>
                  <Link href="https://www.linkedin.com/company/omnistrate/about/" className="flex" target="_blank">
                    <SocialLogo src={linkedinLogo} alt="linkedin-icon" /> Linkedin
                  </Link>
                </CellSocial>
                <CellSocial>
                  <Link href="https://twitter.com/omnistrate" className="flex" target="_blank">
                    <SocialLogo src={twitterLogo} alt="twitter-icon" /> Twitter
                  </Link>
                </CellSocial>
                <CellSocial>
                  <Link href="https://www.facebook.com/omnistrate" className="flex" target="_blank">
                    <SocialLogo src={fbLogo} alt="facebook-icon" /> Facebook
                  </Link>
                </CellSocial>
                <CellSocial>
                  <Link href="https://www.youtube.com/@omnistrate" className="flex" target="_blank">
                    <SocialLogo src={youtubeLogo} alt="youtube-icon" /> Youtube
                  </Link>
                </CellSocial>
                <CellSocial sx={{ width: "100%" }}>
                  <Box mt={"12px"}>
                    <Image className="ml-auto" src={SocLogo} alt="soc logo" />
                  </Box>
                </CellSocial>
              </Column>
            </Grid>
            <Box className="flex items-center justify-end">
              <Typography fontSize="14px" lineHeight="20px" color="#6B7280">
                © {new Date().getFullYear()} Omnistrate, Inc. All rights reserved.
              </Typography>
            </Box>
          </>
        )}
      </SectionContainer>
    </footer>
  );
}

export default Footer;
