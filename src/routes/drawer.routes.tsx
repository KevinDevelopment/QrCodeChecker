import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

const { Screen, Navigator } = createDrawerNavigator();

import { Home } from "../screens/home/home";
import { Scanner } from "../screens/scanner/scanner";
import { Scanned } from "../screens/scanned/home";
import { Details } from "../screens/details/details";


export function DrawerRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: true
            }}
        >

            <Screen
                name="home"
                component={Home}
                options={{
                    drawerIcon: () => <MaterialIcons name="home" size={22} />
                }}
            />

            <Screen
                name="scanner"
                component={Scanner}
                options={{
                    drawerIcon: () => <MaterialIcons name="scanner" size={22} />
                }}
            />

            <Screen
                name="scanned"
                component={Scanned}
                options={{
                    drawerIcon: () => <MaterialIcons name="scanner" size={22} />
                }}
            />

            <Screen
                name="details"
                component={Details}
                options={{
                    drawerIcon: () => <MaterialIcons name="details" size={22} />
                }}
            />
        </Navigator>
    );
}