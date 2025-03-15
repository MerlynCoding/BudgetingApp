import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Intro from "./Intro";
import Homescreen from "./Homescreen";
import AddTransaction from "./AddTransaction";
import BudgetsScreen from "./BudgetsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Homescreen" component={Homescreen} />
        <Stack.Screen name="AddTransaction" component={AddTransaction} />
        <Stack.Screen name="BudgetsScreen" component={BudgetsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
