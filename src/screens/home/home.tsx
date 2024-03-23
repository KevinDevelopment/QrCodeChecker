import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { VStack, Box, View } from "@gluestack-ui/themed"
import { Image, Text, Button } from "react-native";

export function Home() {
    const navigation = useNavigation();

    function handleOpenScreen() {
        navigation.navigate('scanner');
    }

    return (
        <SafeAreaView>
            <Box style=
                {{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20
                }}>
                <VStack style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={require("../../../assets/tabler_qrcode.png")}
                    />
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>Nenhum código ainda</Text>
                    <Text style={{ marginTop: 8, fontSize: 16, textAlign: "center" }}>Parece que você ainda não escaneou nenhum código QR.</Text>
                    <View style={{ width: "95%", marginTop: 16 }}>
                        <Button onPress={() => handleOpenScreen()} title="Escanear"></Button>
                    </View>
                </VStack>
            </Box>
        </SafeAreaView>
    );
}







