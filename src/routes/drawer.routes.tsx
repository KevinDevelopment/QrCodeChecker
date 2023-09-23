import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

const { Screen, Navigator } = createDrawerNavigator();

import { Home } from "../screens/home/home";
import { Scanner } from "../screens/scanner/scanner";

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
                name="scanner"
                component={Scanner}
                options={{
                    drawerIcon: () => <MaterialIcons name="home" size={22}/>
                }}
            />
        </Navigator>
    );
}