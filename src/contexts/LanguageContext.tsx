import { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LanguageType = "AR" | "EN";

type LanguageContextType = {
  language: LanguageType;
  updateLanguage: (language: LanguageType) => void;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

// This app supports two languages (AR & EN)
export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  // default language is English
  const [language, setLanguageState] = useState<LanguageType>("EN");

  // verify language selection on app mount
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("language");
        if (storedLanguage === "AR" || storedLanguage === "EN")
          setLanguageState(storedLanguage);
      } catch (error) {
        console.error(`Error loading app language: ${error}`);
      }
    };
    loadLanguage();
  }, []);

  const updateLanguage = async (newLanguage: LanguageType) => {
    try {
      await AsyncStorage.setItem("language", newLanguage);
      setLanguageState(newLanguage);
    } catch (error) {
      console.error(`Error while updating the language: ${error}`);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
