import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

const { Screen, Navigator } = createBottomTabNavigator();

import { Home } from "../screens/home/home";
import { Scanner } from "../screens/scanner/scanner";

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
                name="scanner"
                component={Scanner}
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