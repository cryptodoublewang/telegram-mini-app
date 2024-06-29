import {
  Inter,
  Poppins,
  Anonymous_Pro,
  Space_Grotesk,
  Bitter,
  Plus_Jakarta_Sans,
} from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

const monument = localFont({
  src: [
    {
      path: "../../public/monument/MonumentExtended-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/monument/MonumentExtended-Ultrabold.otf",
      weight: "700",
    },
  ],
  variable: "--font-monument",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const anonymousPro = Anonymous_Pro({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const bitter = Bitter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default {
  "--inter-font": inter.style.fontFamily,
  "--poppins-font": poppins.style.fontFamily,
  "--font-monument": monument.style.fontFamily,
  "--anonymous-pro": anonymousPro.style.fontFamily,
  "--space-grotesk": spaceGrotesk.style.fontFamily,
  "--bitter": bitter.style.fontFamily,
  "--plus-jakarta-sans": plusJakartaSans.style.fontFamily,
};
