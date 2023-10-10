import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import SplashScreen from "./screen/Splash";
import LoginScreen from "./screen/Login";
import SignupScreen from "./screen/Signup";
import ResetScreen from "./screen/Reset";
import HomeScreen from "./screen/Home";
import DashboardScreen from "./screen/Dashboard";
import JobScreen from "./screen/Jobs";
import DetailScreen from "./screen/Detail";
import useAuth from "./hooks/useAuth";
import Onboarding from "./screen/OnboardingForm";

const Stack = createNativeStackNavigator();

function App() {
  const { id } = useAuth();
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  console.log(id);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!id ? (
          <>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{
                header: () => null,
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{
                header: () => null,
              }}
            />

            {/* <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                header: () => null,
              }}
            /> */}
            <Stack.Screen
              name="Reset"
              component={ResetScreen}
              options={{
                header: () => null,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                header: () => null,
              }}
            />

            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{
                header: () => null,
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Jobs"
              component={JobScreen}
              options={{
                header: () => null,
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
