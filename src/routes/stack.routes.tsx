import { createStackNavigator } from "@react-navigation/stack";

const { Screen, Navigator } = createStackNavigator();

import { Home } from "../screens/home/home";
import { Teste } from "../screens/teste/teste";

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
                name="teste"
                component={Teste}
                options={{
                    title: "tela de teste",
                    headerTitleAlign: "center"
                }}
            />
        </Navigator>
    );
}