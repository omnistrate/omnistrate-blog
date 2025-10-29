import { useState } from "react";
import Link from "next/link";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Drawer as MuiDrawer, List, ListItemText, styled, useMediaQuery, useTheme } from "@mui/material";

import { StyledToolbar } from "./Header";
import ResourceMenu from "./ResourceMenu";
import { PRODUCT_URL } from "@/constants/site";

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    display: "none"
  },
  "& .MuiDrawer-paper": {
    minHeight: "100vh",
    background: "#000000"
  }
}));

const Container = styled(Box)(() => ({
  background: "#000000"
}));

const ListContainer = styled("ul")(() => ({
  padding: "20px 30px ",
  margin: 0,
  listStyleType: "none",
  maxWidth: 700,
  marginInline: "auto"
}));

const ListItem = styled("li", {
  shouldForwardProp: (prop) => {
    return prop !== "hideAboveMobile";
  }
})<{ hideAboveMobile?: boolean }>(({ theme, hideAboveMobile }) => ({
  color: "#f5f5f7",
  fontSize: 18,
  padding: "16px 0px",
  textAlign: "left",
  "&:nth-of-type(1)": {
    borderTop: "none"
  },
  borderTop: "1px solid #424245",
  [theme.breakpoints.up("md")]: {
    display: hideAboveMobile ? "none" : "block"
  }
}));

interface NavDrawerProps {
  open: boolean;
  closeDrawer: () => void;
}

function NavDrawer(props: NavDrawerProps) {
  const { open, closeDrawer } = props;
  const [developerMenu, setDeveloperMenu] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  if (isDesktop && open) {
    closeDrawer();
  }

  const handleDeveloperMenu = () => {
    setDeveloperMenu((prev) => !prev);
  };

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    right: 0
  };

  return (
    <Drawer anchor="top" open={open} onClose={closeDrawer} hideBackdrop>
      <Container>
        <StyledToolbar
          sx={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        />
        <Box sx={{ borderTop: "1px solid #424245", paddingBottom: "50px" }}>
          <ListContainer>
            <ListItem key={"Developers"} onClick={handleDeveloperMenu}>
              <ListItemText
                style={{ position: "relative" }}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "18px"
                  }
                }}
                color="#ffffff"
              >
                Developer
                {developerMenu ? <ExpandLess style={iconStyle} /> : <ExpandMore style={iconStyle} />}
              </ListItemText>
            </ListItem>
            <Collapse in={developerMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding onClick={closeDrawer}>
                <ResourceMenu />
              </List>
            </Collapse>

            <ListItem onClick={closeDrawer}>
              <Link href={`/pricing`}>Pricing</Link>
            </ListItem>

            <ListItem onClick={closeDrawer}>
              <Link href={`/about`}>About</Link>
            </ListItem>

            <ListItem hideAboveMobile>
              <Link href={`${PRODUCT_URL}/signin`}>Sign In</Link>
            </ListItem>
            <ListItem hideAboveMobile onClick={closeDrawer}>
              <Link href="https://calendly.com/omnistrate/meeting" target="_blank">
                Book a Demo
              </Link>
            </ListItem>
          </ListContainer>
        </Box>
      </Container>
    </Drawer>
  );
}

export default NavDrawer;
