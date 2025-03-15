import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Intro from "./Intro"; // Ensure correct path
//import Homescreen from "./Homescreen"; // Ensure correct path

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={Intro} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
