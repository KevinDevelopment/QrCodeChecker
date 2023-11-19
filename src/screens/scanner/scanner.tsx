import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, ButtonText, ButtonIcon } from '@gluestack-ui/themed';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config";
import { Linking } from 'react-native';
import { IoIosQrScanner } from "react-icons/io";
import { BarCodeScanner } from 'expo-barcode-scanner';

export function Scanner() {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Urls escaneadas apareceram aqui");
    const navigation = useNavigation();

    async function asKForCameraPermission() {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
    }

    function scanUrl() {
        navigation.navigate("scanned", { url: text });
    }

    useEffect(() => {
        asKForCameraPermission()
    }, []);

    const handleBarCodeScanned = ({ type, data }: any) => {
        setScanned(true);
        setText(data);
        console.log(`o tipo é ${type}`)
        // navigation.navigate("scanned", { url: data });
    };

    if (hasPermission === null) {
        <View style={styles.container}>
            <Text>Conceda permissão pra acessar a camera</Text>
        </View>
    }

    if (hasPermission === false) {
        <View style={styles.container}>
            <Text>Sem acesso a camera</Text>
            <Button size="md" onPress={() => asKForCameraPermission()} variant="solid" action="primary" isDisabled={false} isFocusVisible={false} >
                <ButtonText>Permitir</ButtonText>
            </Button>
        </View>
    }

    // if (!hasPermission) {
    //     return (
    //         <View style={styles.container}>
    //             <Text>Conceda permissão pra acessar a camera</Text>
    //         </View>
    //     )
    // }

    return (
        <GluestackUIProvider config={config}>
            <View style={styles.container}>
                {/* {scanned && <Text style={styles.url}>{text}</Text>}
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    style={StyleSheet.absoluteFillObject}
                    aria-modal
                />
                <View style={styles.button}>
                    {scanned &&

                        <Button size="md" onPress={() => setScanned(false)} variant="solid" action="primary" isDisabled={false} isFocusVisible={false} >
                            <ButtonText>Escanear novamente</ButtonText>
                        </Button>

                    }
                </View> */}
                <Text style={styles.mainText}>{text}</Text>
                <View style={styles.barCodeBox}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                        style={{ height: 400, width: 400 }}
                        aria-modal
                    />
                </View>

                <Button style={styles.button} size="md" onPress={() => setScanned(false)} variant="solid" action="primary" isDisabled={false} isFocusVisible={false} >
                    <ButtonText>Escanear novamente</ButtonText>
                </Button>

                {scanned &&

                    <Button style={styles.button} size="md" onPress={() => scanUrl()} variant="solid" action="primary" isDisabled={false} isFocusVisible={false} >
                        <ButtonText>Analizar Url</ButtonText>
                    </Button>

                }
            </View>
        </GluestackUIProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
    },
    button: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        minWidth: "70%",
        minHeight: "6%",
        marginBottom: 10
    },
    url: {
        width: "80%",
        textAlign: "center",
        backgroundColor: "red",
        borderRadius: 10,
        padding: 5,
        color: "white"
    },
    barCodeBox: {
        backgroundColor: "tomato",
        alignItems: "center",
        justifyContent: "center",
        height: 300,
        width: 300,
        overflow: "hidden",
        borderRadius: 30,
        marginBottom: 100,
        marginTop: 60
    },
    mainText: {
        fontSize: 16,
        backgroundColor: "#8600c6",
        borderRadius: 10,
        padding: 10,
        color: "white"
    }
});
