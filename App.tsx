import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "./src/screens/MenuScreen";
import IngredientScreen from "./src/screens/IngredientScreen";

export type RootStackParamList = {
  Menu: undefined;
  Ingredient: { dish: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Ingredient" component={IngredientScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
