import { styled } from "@mui/material";
import MuiButton, { buttonClasses } from "@mui/material/Button";

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => {
    return prop !== "fontColor" && prop !== "outlineColor" && prop !== "outlineBg" && prop !== "bgColor";
  }
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
      background: outlineBg ? outlineBg : theme.palette.primary.main
    },
    [`&.${buttonClasses.contained}`]: {
      color: theme.palette.primary.main,
      background: bgColor ? bgColor : "#ABC6D8",
      color: fontColor ? fontColor : theme.palette.primary.main
    },
    [`&.${buttonClasses.sizeLarge}`]: {
      padding: "10px 18px",
      fontSize: {
        mobile: "14px",
        mobileLarge: "16px"
      },
      fontWeight: 600,
      lineHeight: "24px",
      borderRadius: "8px"
    }
  };
});

export default StyledButton;
