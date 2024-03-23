import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context"
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
            <View style={{ width: "95%", marginTop: 16 }}>
                <Button onPress={() => asKForCameraPermission()} title="Permitir"></Button>
            </View>
        </View>
    }

    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <Text>Conceda permissão pra acessar a camera</Text>
            </View>
        )
    }

    const resetScanner = () => {
        // setScanned(false);
        // setText("Urls escaneadas apareceram aqui");
        scanUrl()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                style={{ flex: 1 }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.cornerTopLeft}></View>
                    <View style={styles.cornerTopRight}></View>
                    <View style={styles.cornerBottomLeft}></View>
                    <View style={styles.cornerBottomRight}></View>
                </View>
            </BarCodeScanner>
            <View style={{ width: "100%" }}>
                <Button onPress={() => resetScanner()} title="Escanear novemente"></Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cornerTopLeft: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 130,
        height: 130,
        borderColor: 'white',
        borderWidth: 3,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    cornerTopRight: {
        position: 'absolute',
        top: '50%',
        right: '50%',
        width: 130,
        height: 130,
        borderColor: 'white',
        borderWidth: 3,
        borderRightWidth: 0,
        borderTopWidth: 0,
    },
    cornerBottomLeft: {
        position: 'absolute',
        bottom: '50%',
        left: '50%',
        width: 130,
        height: 130,
        borderColor: 'white',
        borderWidth: 3,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    cornerBottomRight: {
        position: 'absolute',
        bottom: '50%',
        right: '50%',
        width: 130,
        height: 130,
        borderColor: 'white',
        borderWidth: 3,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
    },
});