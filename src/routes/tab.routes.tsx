import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

const { Screen, Navigator } = createBottomTabNavigator();

import { Home } from "../screens/home/home";
import { Teste } from "../screens/teste/teste";

export function TabRoutes() {
    return (
        <Navigator
            screenOptions={{
                tabBarActiveTintColor: "navy",
                tabBarInactiveTintColor: "gray",
                headerShown: false
            }}
        >
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="home"
                            color={color}
                            size={size}
                        />
                    )
                }}
            />

            <Screen
                name="teste"
                component={Teste}
                options={{
                    tabBarLabel: "teste",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="arrow-back"
                            color={color}
                            size={size}
                        />
                    )
                }}
            />
        </Navigator>
    );
}