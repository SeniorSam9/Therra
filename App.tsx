import UserPreferenceProvider from "./src/contexts/UserPreferenceContext";
import FontProvider from "./src/contexts/FontContext";
import StackNavigation from "./src/routes/StackNavigation";
import * as SplashScreen from "expo-splash-screen";
import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <FontProvider>
      <UserPreferenceProvider>
        <StackNavigation />
      </UserPreferenceProvider>
    </FontProvider>
  );
}
