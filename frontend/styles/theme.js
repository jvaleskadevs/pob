import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f7fafc",
      100: "#edf2f7",
      200: "#e2e8f0",
      300: "#cbd5e0",
      400: "#a0aec0",
      500: "#718096",
      600: "#4a5568",
      700: "#2d3748",
      800: "#1a202c",
      900: "#171923",
    },
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Montserrat, sans-serif",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  styles: {
    global: {
      "html, body": {
        fontSize: "md",
        color: "brand.700",
        lineHeight: "tall",
      },
      "h1, h2, h3, h4, h5, h6": {
        fontFamily: "heading",
        fontWeight: "bold",
        color: "brand.900",
        letterSpacing: "tight",
        marginBottom: "1rem",
        lineHeight: "1.2",
      },
      p: {
        fontFamily: "body",
        fontWeight: "normal",
        color: "brand.700",
        marginBottom: "1rem",
        lineHeight: "tall",
      },
      a: {
        color: "brand.500",
        _hover: {
          textDecoration: "none",
          color: "brand.600",
        },
      },
      ul: {
        fontFamily: "body",
        fontWeight: "normal",
        color: "brand.700",
        marginBottom: "1rem",
        lineHeight: "tall",
        listStyleType: "disc",
        listStylePosition: "outside",
        paddingLeft: "1.5rem",
      },
      ol: {
        fontFamily: "body",
        fontWeight: "normal",
        color: "brand.700",
        marginBottom: "1rem",
        lineHeight: "tall",
        listStyleType: "decimal",
        listStylePosition: "outside",
        paddingLeft: "1.5rem",
      }
    },
  },
});

export default theme;

