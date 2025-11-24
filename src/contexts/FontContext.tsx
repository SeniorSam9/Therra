import { createContext, ReactNode, useEffect } from "react";
import {
  useFonts as useInterFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
  useFonts as useNotoFonts,
  NotoSansArabic_400Regular,
  NotoSansArabic_600SemiBold,
} from "@expo-google-fonts/noto-sans-arabic";
import * as SplashScreen from "expo-splash-screen";

type FontContextType = {
  fontsLoaded: boolean;
  fonts: {
    en: { regular: string; semiBold: string };
    ar: { regular: string; semiBold: string };
  };
};

const FontContext = createContext<FontContextType>({
  fontsLoaded: false,
  fonts: {
    en: { regular: "", semiBold: "" },
    ar: { regular: "", semiBold: "" },
  },
});

export default function FontProvider({ children }: { children: ReactNode }) {
  // load both fonts
  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });
  const [notoLoaded] = useNotoFonts({
    NotoSansArabic_400Regular,
    NotoSansArabic_600SemiBold,
  });

  const fontsLoaded = interLoaded && notoLoaded;

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const fonts = {
    en: { regular: "Inter_400Regular", semiBold: "Inter_600SemiBold" },
    ar: {
      regular: "NotoSansArabic_400Regular",
      semiBold: "NotoSansArabic_600SemiBold",
    },
  };

  if (!fontsLoaded) return null;

  return (
    <FontContext.Provider value={{ fontsLoaded, fonts }}>
      {children}
    </FontContext.Provider>
  );
}
