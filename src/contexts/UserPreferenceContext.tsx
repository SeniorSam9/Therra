import { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LanguageType = "AR" | "EN";
type ThemeType = "dark" | "light";

type UserPreferenceContextType = {
  theme: ThemeType;
  language: LanguageType;
  updateUserPreference: (preference: {
    theme?: ThemeType;
    language?: LanguageType;
  }) => void;
};

export const UserPreferenceContext =
  createContext<UserPreferenceContextType | null>(null);

export default function UserPreferenceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [preference, setPreferenceState] = useState<{
    theme: ThemeType;
    language: LanguageType;
  }>({
    theme: "dark", // default theme
    language: "EN", // default language
  });

  // verify language selection on app mount
  useEffect(() => {
    const loadPreference = async () => {
      try {
        const data = await AsyncStorage.getItem("preference");
        const storedPreference = data ? JSON.parse(data) : null;
        if (storedPreference) setPreferenceState(storedPreference);
      } catch (error) {
        console.error(`Error loading user language: ${error}`);
      }
    };
    loadPreference();
  }, []);

  const updateUserPreference = async (newPreference: {
    theme?: ThemeType;
    language?: LanguageType;
  }) => {
    try {
      const updatedPreference = { ...preference, ...newPreference };
      await AsyncStorage.setItem(
        "preference",
        JSON.stringify(updatedPreference)
      );
      setPreferenceState(updatedPreference);
    } catch (error) {
      console.error(`Error while updating the preferences: ${error}`);
    }
  };

  return (
    <UserPreferenceContext.Provider
      value={{
        theme: preference.theme,
        language: preference.language,
        updateUserPreference,
      }}
    >
      {children}
    </UserPreferenceContext.Provider>
  );
}
