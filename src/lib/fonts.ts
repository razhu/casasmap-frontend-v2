import {
  Inter,
  Poppins,
  Montserrat,
  Work_Sans,
  Lora,
  Playfair_Display,
  Roboto,
} from "next/font/google";

// Choose your font here - just uncomment the one you want to use

// Modern & Clean Options
// export const fontSans = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const fontSans = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

// export const fontSans = Montserrat({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// export const fontSans = Work_Sans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// Classic & Professional Options
// export const fontSans = Roboto({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "700"],
//   variable: "--font-sans",
// });

// Serif Options (for headings or body)
// export const fontSerif = Lora({
//   subsets: ["latin"],
//   variable: "--font-serif",
// });

// export const fontSerif = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-serif",
// });
