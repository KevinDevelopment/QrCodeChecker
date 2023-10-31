import { View, Button, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";
const image = { uri: '../../../assets/WhatsApp Image 2023-10-30 at 19.51.22 (1).jpeg' };

export function Home() {
    const navigation = useNavigation();

    function handleOpenScreen() {
        navigation.navigate('scanner', { name: "" });
    }

    return (
        <ImageBackground source={require("../../../assets/detetive.jpg")} resizeMode="stretch" style={styles.image}>

            <View style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 730 }}>                
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleOpenScreen()}
                >
                    <Image
                        source={require('../../../assets/lupa.png')}
                        style={styles.touch}
                    />
                    <Text style={styles.text}>
                        scannear
                    </Text>
                </TouchableOpacity>
            </View >

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 10
    },
    button: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        width: "70%",
        height: "70%",
        borderRadius: 10
    },
    touch: {
        width: 100,
        height: 60
    }
});





