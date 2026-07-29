import localFont from "next/font/local";

export const gilory = localFont({
  src: [
    {
      path: "../app/fonts/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/Gilroy-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/Gilroy-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/Gilroy-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gilory",
  display: "swap",
});
