import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

const { Screen, Navigator } = createDrawerNavigator();

import { Home } from "../screens/home/home";
import { Teste } from "../screens/teste/teste";

export function DrawerRoutes() {
    return (
        <Navigator>
            <Screen
                name="home"
                component={Home}
                options={{
                    drawerIcon: () => <MaterialIcons name="home" size={22}/>
                }}
            />

            <Screen
                name="teste"
                component={Teste}
            />
        </Navigator>
    );
}