import { createTheme } from "@mui/material/styles";
import { faIR } from "@mui/material/locale";
import {
  Dark_Green,
  Light_Green,
  Light_Tusi,
  Natural,
  Basecolor,
} from "./Color";
import "../fonts/IRANYekanX/Webfonts/style.css";
import "../fonts/IRANYekanX/Webfonts/woff2/IRANYekanX-Regular.woff2";
import IRANYekanX from "../fonts/IRANYekanX/Webfonts/woff2/IRANYekanX-Regular.woff2";
const theme = createTheme(
  {
    direction: "rtl",
    typography: {
      fontFamily: "IRANYekanX",
      fontSize: 14,
      fontWeightBold: 700,
      shape: {
        pillRadius: 50,
      },
      h1: {
        fontFamily: "IRANYekanX",
        fontSize: 44,
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "140%",
      },
      h2: {
        fontFamily: "IRANYekanX",
        fontSize: 40,
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "140%",
      },
      h3: {
        fontSize: 32,
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "120%",
        textTransform: "capitalize",
      },
      h4: {
        fontFamily: "IRANYekanX",
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "120%",
        textTransform: "capitalize",
      },
      h5: {
        fontFamily: "IRANYekanX",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "140%",
      },
      h6: {
        fontFamily: "IRANYekanX",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "180%",
      },
      h7: {
        fontFamily: "IRANYekanX",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "140%",
        textTransform: "capitalize",
      },
      body1: {
        fontFamily: "IRANYekanX",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "180%",
        textTransform: "capitalize",
      },
      body2: {
        fontFamily: "IRANYekanX",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "180%",
        textTransform: "capitalize",
      },
    },
    palette: {
      background: {
        default: Basecolor[200],
      },
      text: {
        default: Basecolor[100],
      },
      primary: {
        main: Light_Green[700],
      },
      secondary: {
        main: Light_Tusi[700],
      },
      success: {
        main: Dark_Green[55],
        light: "#F3FDFA",
      },
      warning: {
        main: "#A9791C",
        light: "#FFF8E1",
      },
      error: {
        main: "#C30000",
        light: "#FFF2F2",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            display: "inline-flex",
            padding: "13px 16px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4px",
            fontFamily: "IRANYekanX",
            gap: "8px",
            flexShrink: 0,
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            fontFamily: "IRANYekanX",
            marginTop: "5px",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            justifyContent: "center",
            alignItems: "center",
            margin: "16px 0px 0px 34px",
            color: Dark_Green[400],
            fontSize: "10px",
            ":disabled": {
              color: Basecolor[100],
              background: Natural[600],
            },
            "::slotted": {
              color: Dark_Green[500],
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderColor: "#CBCBCB",
            boxShadow: "0px",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "4px",
            borderColor: "#CBCBCB",
            background: "var(--ffffff, #FFF)",
            ":disabled": {
              color: Basecolor[100],
              background: Natural[600],
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: `
              @font-face {
                font-family: 'IRANYekanX';
                font-style: normal;
                font-display: swap;
                font-weight: 400;
                src: local('IRANYekanX'), local('IRANYekanX'), url(${IRANYekanX}) format('woff2');
              }
            `,
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            position: "fixed",
            background: `${Basecolor[200]}`,
            color: `${Natural[100]}`,
            width: "100%",
          },
        },
      },
    },
  },
  faIR
);

export default theme;
theme.typography.body1 = {
  [theme.breakpoints.down("xs")]: {
    fontSize: 14,
    fontFamily: "IRANYekanX",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 16,
    fontFamily: "IRANYekanX",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: 16,
    fontFamily: "IRANYekanX",
  },
  [theme.breakpoints.up("md")]: {
    fontFamily: "IRANYekanX",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "180%",
    textTransform: "capitalize",
  },
};
theme.typography.button = {
  // [theme.breakpoints.down("lg")]: {
  //   fontSize: 16,
  //   fontFamily: "IRANYekanX",
  // },
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    fontFamily: "IRANYekanX",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
    textTransform: "capitalize",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: 16,
    fontFamily: "IRANYekanX",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
    textTransform: "capitalize",
  },
};
theme.typography.caption = {
  [theme.breakpoints.up("md")]: {
    fontSize: 14,
    fontFamily: "IRANYekanX",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: 12,
    fontFamily: "IRANYekanX",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
    fontFamily: "IRANYekanX",
  },
};
