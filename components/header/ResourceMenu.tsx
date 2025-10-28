import Link from "next/link";
import { Box, styled, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { RESOURCE_MENU } from "./constants";

const ProductCard = styled(Box)(({ isMobile }) => ({
  display: "flex",
  maxWidth: isMobile ? "100%" : "1050px",
  margin: isMobile ? "0" : "24px 20px"
}));

const StyledLink = styled(Link)(({ isMobile, target }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  maxWidth: "100%",
  padding: isMobile ? "10px" : "12px",
  borderRadius: 8,
  paddingLeft: isMobile ? "30px" : "10px",
  "&:hover": {
    backgroundColor: target === "Quick Links" ? "rgba(0,0,0,0.08)" : "rgba(0,0,0, 0.04)"
  }
}));

const SubitemCard = styled(Box)`
  display: flex;
  align-items: ${(isMobile) => (isMobile ? "flex-start" : "center")};
  gap: 10px;
  flexwrap: wrap;
`;

const productCard = (subItems, isMobile) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: isMobile ? "column" : "row"
      }}
    >
      {subItems.map(({ title, target, icon: Icon, bullets, path, text, mobileIconColor = "#FFFFFF" }) => (
        <Box
          key={title}
          sx={{
            padding: isMobile ? "8px 0" : "0",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            width: "310px",
            maxWidth: "100%"
          }}
        >
          <StyledLink href={path} target={target || ""}>
            <SubitemCard
              onClick={(e) => {
                if (!path) e.preventDefault();
              }}
              isMobile={isMobile}
            >
              <Box sx={{ flexShrink: 0 }}>
                <Icon style={{}} width="32" height="32" color={isMobile ? mobileIconColor : "#000000"} />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  flexWrap: "wrap"
                }}
              >
                <Typography
                  color={isMobile ? "#ffffff" : "#101828"}
                  fontSize={"16px"}
                  fontWeight={600}
                  sx={{
                    lineHeight: "24px",
                    mt: isMobile ? "3px" : "0px",
                    whiteSpace: "normal",
                    wordBreak: "break-word"
                  }}
                >
                  {title}
                </Typography>
                {!isMobile && (
                  <>
                    <Typography
                      color={isMobile ? "#ffffff" : "#475467"}
                      fontSize={"14px"}
                      fontWeight={400}
                      sx={{
                        lineHeight: "20px"
                      }}
                      className="line-clamp-2"
                    >
                      {text}
                    </Typography>
                    <Box component={"ul"}>
                      {bullets?.map((item, i) => (
                        <Box
                          key={i}
                          component={"li"}
                          sx={{
                            fontSize: "14px",
                            color: "#212121",
                            fontWeight: "400",
                            pl: "4px",
                            py: "2px"
                          }}
                        >
                          {item}
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </SubitemCard>
          </StyledLink>
        </Box>
      ))}
    </Box>
  );
};

const resourceItems = (isMobile) => {
  return RESOURCE_MENU.map((item) => (
    <Box
      key={item.title}
      backgroundColor={item.title === "Quick Links" && !isMobile ? "#F9FAFB" : "unset"}
      sx={{
        padding: !isMobile ? "0px" : "0px 20px 20px 20px"
      }}
    >
      <Typography
        color={isMobile ? "#ffffff" : "#374151"}
        fontSize={"16px"}
        fontWeight={600}
        sx={{
          lineHeight: "24px",
          mt: isMobile ? "3px" : "0px"
        }}
      >
        {item.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "flex-start",
          alignItems: "stretch",
          padding: isMobile ? "0" : "12px 0 0 0"
        }}
      >
        {productCard(item.subMenu, isMobile)}
      </Box>
    </Box>
  ));
};

export default function ResourceMenu({ handleClose }) {
  const isMobile = useMediaQuery("(max-width:1135px)");

  const ProductCardStyles = {
    backgroundColor: isMobile ? "unset" : "#ffffff",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    margin: 0,
    marginLeft: isMobile ? "0px" : "10px",
    padding: isMobile ? "0px" : "20px 24px"
  };

  return (
    <ProductCard style={ProductCardStyles} onClick={handleClose}>
      {resourceItems(isMobile)}
    </ProductCard>
  );
}
