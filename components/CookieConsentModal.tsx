import { useState } from "react";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Stack, styled } from "@mui/material";

import StyledButton from "./Button";

import { useCookieConsentContext } from "@/context/cookieConsentContext";
import FlagWithBackground from "@/icons/FlagWithBackground";

const StyledConsentContainer = styled(Box)<{ maxWidth?: string }>(({ maxWidth }) => ({
  position: "fixed",
  bottom: "0",
  right: "50%",
  transform: "translateX(50%)",
  background: "#364152",
  borderRadius: "12px",
  border: "1px solid #4B5565",
  boxShadow: "0px 2px 2px -1px #0A0D120A, 0px 4px 6px -2px #0A0D1208, 0px 12px 16px -4px #0A0D1214",
  padding: "12px",
  width: "100%",
  maxWidth: maxWidth,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  zIndex: 99999999
}));

function CookieConsentModal() {
  const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);
  const { consentState, updateConsent, isConsentModalOpen, setIsConsentModalOpen } = useCookieConsentContext();

  const closeConsentModal = () => setIsConsentModalOpen(false);
  const closePreferenceModal = () => setIsPreferenceModalOpen(false);

  const handleAllowAll = () => {
    updateConsent(consentState?.categories?.map((category) => ({ ...category, enabled: true })));
    closePreferenceModal();
    closeConsentModal();
  };

  const handleAllowNecessary = () => {
    updateConsent(
      consentState?.categories?.map((category) =>
        category.category === "necessary" ? { ...category, enabled: true } : { ...category, enabled: false }
      )
    );
    closePreferenceModal();
    closeConsentModal();
  };

  return (
    <>
      {isConsentModalOpen && !isPreferenceModalOpen && (
        <StyledConsentContainer maxWidth={"1216px"}>
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
            <Stack direction="row" alignItems="center" gap="16px">
              <FlagWithBackground />
              <p className="text-sm md:text-base font-semibold text-white">
                We use third-party cookies in order to personalise your experience.{" "}
                <Box component={"span"} sx={{ fontWeight: 400 }}>
                  Read our{" "}
                  <Link
                    href={"https://omnistrate.com/cookie-policy"}
                    target="_blank"
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Cookie Policy
                  </Link>
                </Box>
              </p>
              <CloseIcon
                htmlColor="#ffffff"
                sx={{ cursor: "pointer", flexShrink: 0, display: { sm: "block", md: "none" } }}
                onClick={closeConsentModal}
              />
            </Stack>

            <Stack direction="row" gap="16px" alignItems="center" flexShrink={0}>
              <StyledButton
                size="large"
                variant="contained"
                // @ts-expect-error fontColor is a valid prop
                fontColor="#000000"
                bgColor="#ffffff"
                onClick={handleAllowNecessary}
              >
                Allow necessary
              </StyledButton>
              <StyledButton
                size="large"
                variant="contained"
                // @ts-expect-error fontColor is a valid prop
                fontColor="#ffffff"
                bgColor="#000000"
                onClick={handleAllowAll}
              >
                Allow all
              </StyledButton>
              <CloseIcon
                htmlColor="#ffffff"
                sx={{ cursor: "pointer", flexShrink: 0, display: { sm: "none", md: "block" } }}
                onClick={closeConsentModal}
              />
            </Stack>
          </div>
        </StyledConsentContainer>
      )}
    </>
  );
}

export default CookieConsentModal;
