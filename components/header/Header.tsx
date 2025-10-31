"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Close as CloseIcon, KeyboardArrowDown as KeyboardArrowDownIcon, Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Box, IconButton as MuiIconButton, styled, Toolbar, Tooltip, tooltipClasses } from "@mui/material";

import { Button } from "@/components/ui/button";

import NavDrawer from "./NavDrawer";
import ResourceMenu from "./ResourceMenu";
import { Logo } from "../logo";
import { PRODUCT_URL, WEBSITE_URL } from "@/constants/site";
import ChevronRightIcon from "@/icons/ChevronRightIcon";

// @ts-expect-error Not an error
const StyledTooltip = styled(({ className, title, open, setOpen, offset = [0, 0], ...props }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    // @ts-expect-error Not an error
    <Tooltip
      {...props}
      open={open}
      title={title}
      classes={{ popper: className }}
      onClose={handleClose}
      onOpen={handleOpen}
      PopperProps={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset
            }
          }
        ]
      }}
    />
  );
})(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "unset",
    marginTop: "35px !important",
    width: "auto",
    backgroundColor: "#FFFFFF",
    border: " 1px solid #EAECF0",
    boxShadow: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
    borderRadius: "8px",
    padding: 0,
    overflow: "hidden"
  }
}));

export const StyledToolbar = styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== "drawerOpen"
})(({ theme }) => {
  return {
    maxWidth: 1216 + 64,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    height: 68,
    backgroundColor: "#FFF",
    paddingLeft: 24,
    paddingRight: 24,

    [theme.breakpoints.down("lg")]: {
      height: 60
    },
    [theme.breakpoints.down("md")]: {
      height: 60
    },
    [theme.breakpoints.up("sm")]: {
      minHeight: 60
    }
  };
});

const NavList = styled("ul")(({ theme }) => ({
  listStyleType: "none",
  marginLeft: 40,
  display: "inline-flex",
  alignItems: "center",
  gap: 24,
  [theme.breakpoints.down("lg")]: {
    display: "none"
  }
}));

const NavItem = styled("li")(() => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "16px",
  cursor: "pointer",
  color: "#1F2937"
}));

export const IconButton = styled(MuiIconButton)(({ theme }) => ({
  color: "#000000",
  marginLeft: 47,
  [theme.breakpoints.up("lg")]: {
    display: "none"
  },
  zIndex: 1201
}));

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentPath = usePathname();

  const [resourceOpen, setResourceOpen] = useState(false);

  const url = currentPath.includes("/partners") ? "/contact" : "https://calendly.com/omnistrate/meeting";

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          display: "block",
          zIndex: 1201,
          padding: "0px !important", //fixing mui bug that adds 5px padding
          backgroundColor: "white",
          boxShadow: "none",
          border: "1px solid #D1D5DB",

          // To prevent Header from shifting when Dialog is opened
          right: "auto",
          width: "100vw !important"
        }}
      >
        {/* @ts-expect-error Not an error */}
        <StyledToolbar drawerOpen={drawerOpen}>
          <div className="flex align-center ">
            <Logo />
            <NavList>
              {/* @ts-expect-error Not an error */}
              <StyledTooltip
                title={<ResourceMenu handleClose={() => setResourceOpen(false)} />}
                open={resourceOpen}
                setOpen={setResourceOpen}
                id="developerMenu"
                offset={[300, -8]}
              >
                <NavItem sx={{ display: "flex", alignItems: "center" }}>
                  Developer{" "}
                  <KeyboardArrowDownIcon
                    sx={{
                      rotate: resourceOpen ? "180deg" : "0deg"
                    }}
                  />
                </NavItem>
              </StyledTooltip>

              <Link href={`${WEBSITE_URL}/pricing`}>
                <NavItem>Pricing</NavItem>
              </Link>
              <Link href={`${WEBSITE_URL}/about`}>
                <NavItem>About</NavItem>
              </Link>
            </NavList>
          </div>
          <div className="flex align-center justify-end">
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block"
                }
              }}
            >
              <Button
                variant="omni-default"
                size="omni-default"
                className="h-10 border border-black shadow-[0_1px_2px_0_#1018280A] p-4 mr-6 md:text-sm"
                asChild
              >
                <Link href={`${PRODUCT_URL}/signin`}>
                  <span>Sign in</span>
                  <ChevronRightIcon />
                </Link>
              </Button>
              <Button
                variant="omni-outline"
                size="omni-default"
                className="h-10 border-[#D4D4D4] p-4 md:text-sm"
                asChild
              >
                <Link href={url} target={currentPath.includes("/partners") ? "_self" : "_blank"}>
                  <span>{currentPath.includes("/partners") ? "Join Our Partner Program" : "Book a Demo"}</span>
                  <ChevronRightIcon color="#1F2937" />
                </Link>
              </Button>
            </Box>
            <IconButton onClick={toggleDrawer} disableRipple>
              {drawerOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        </StyledToolbar>
      </AppBar>
      {/* Adding second toolbar to prevent content from being hidden behind the toolbar */}
      <StyledToolbar />
      <NavDrawer open={drawerOpen} closeDrawer={closeDrawer} />
    </>
  );
}

export default Header;
