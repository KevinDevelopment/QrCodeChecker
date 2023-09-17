import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Home() {
    const navigation = useNavigation();

    function handleOpenScreen() {
        navigation.navigate('teste', { name: "Kevin Cristhian Gomes Ferreira" });
    }

    return (
        <View style={{ flex: 1, backgroundColor: "grey", justifyContent: "center" }}>
            <Button
                title="ir para tela de teste"
                onPress={() => handleOpenScreen()}
            />
        </View>
    );
}