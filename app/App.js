import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import MainPage from "./Pages/MainPage";
import AddQR from "./Pages/AddQR";
import DeleteDialog from "./Pages/DeleteDialog";
import RenameDialog from "./Pages/RenameDialog";

import { StatusBar } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#ffffff" barStyle="#ffffff" />
      <Stack.Navigator
        initialRouteName="MainPage"
        headerMode="none"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: "clamp",
              }),
            },
          }),
        }}
        mode="modal"
      >
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="AddQR" component={AddQR} />
        <Stack.Screen
          name="RenameDialog"
          component={RenameDialog}
          options={{
            presentation: "transparentModal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DeleteDialog"
          component={DeleteDialog}
          options={{
            presentation: "transparentModal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
