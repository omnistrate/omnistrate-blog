import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled } from "@mui/material";
import MuiButton, { buttonClasses } from "@mui/material/Button";

import { Button } from "@/components/ui/button";

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => {
    return prop !== "fontColor" && prop !== "outlineColor" && prop !== "outlineBg" && prop !== "bgColor";
  },
})(({ theme, outlineColor, fontColor, outlineBg, bgColor }) => {
  return {
    fontSize: 14,
    lineHeight: "24px",
    fontWeight: 500,
    textTransform: "none",
    padding: "6px 16px",
    [`&.${buttonClasses.outlined}`]: {
      color: fontColor ? fontColor : "white",
      borderColor: outlineColor ? outlineColor : "#ABC6D8",
      // background: outlineBg ? outlineBg : theme.palette.primary.main,
      background: outlineBg ? outlineBg : theme.palette.primary.main,
    },
    [`&.${buttonClasses.contained}`]: {
      color: theme.palette.primary.main,
      //background: theme.palette.secondary.main,
      background: bgColor ? bgColor : "#ABC6D8",
      color: fontColor ? fontColor : theme.palette.primary.main,
    },
    [`&.${buttonClasses.sizeLarge}`]: {
      padding: "10px 18px",
      fontSize: {
        mobile: "14px",
        mobileLarge: "16px",
      },
      fontWeight: 600,
      lineHeight: "24px",
      borderRadius: "8px",
    },
  };
});

export default StyledButton;

export const HeaderButton = (props) => {
  const { variant } = props;
  return <StyledButton variant={variant ? variant : "contained"} endIcon={<ChevronRightIcon />} {...props} />;
};

export const HeroButton = styled((props) => {
  const { variant, arrowForward, ...otherProps } = props;

  return (
    <MuiButton
      variant={variant ? variant : "contained"}
      {...(arrowForward && { endIcon: <ChevronRightIcon /> })}
      size="large"
      {...otherProps}
    />
  );
})(({ theme }) => {
  return {
    textTransform: "none",
    [`&.${buttonClasses.outlined}`]: {
      color: "#ABC6D8",
      border: "1px solid #ABC6D8",
    },
    [`&.${buttonClasses.contained}`]: {
      backgroundColor: "#ABC6D8",
      color: "#002229",
      fontSize: "16px",
      lineHeight: "18px",
      padding: "14px 20px",
      borderRadius: "8px",
    },
    [theme.breakpoints.up("mobileLarge")]: {
      minWidth: "200px",
    },
  };
});

export const SecondaryButton = (props) => {
  const { arrowForward, children, ...otherProps } = props;

  return (
    <Button variant="omni-default" size="omni-default" {...otherProps}>
      {children} {arrowForward && <ChevronRightIcon />}
    </Button>
  );
};
