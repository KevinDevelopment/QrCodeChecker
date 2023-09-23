import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Home() {
    const navigation = useNavigation();

    function handleOpenScreen() {
        navigation.navigate('scanner', { name: "Kevin Cristhian Gomes Ferreira" });
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "grey",
                display: "flex", flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <View
                style={{
                    maxWidth: "100%"
                }}
            >
                <Button
                    title="Scannear"
                    onPress={() => handleOpenScreen()}
                />
            </View>
        </View>
    );
}

