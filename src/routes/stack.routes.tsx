import { createStackNavigator } from "@react-navigation/stack";

const { Screen, Navigator } = createStackNavigator();

import { Home } from "../screens/home/home";
import { Scanner } from "../screens/scanner/scanner";

export function StackRoutes() {
    return (
        <Navigator>
            <Screen
                name="home"
                component={Home}
                options={{
                    title: "tela inicial",
                    headerTitleAlign: "center"
                }}
            />

            <Screen
                name="scanner"
                component={Scanner}
                options={{
                    title: "tela de teste",
                    headerTitleAlign: "center"
                }}
            />
        </Navigator>
    );
}