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
    const navigation = useNavigation();

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }: any) => {
        setScanned(data);
        // navigation.navigate("scanned", { url: data });
    };

    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <Text>Conceda permissão pra acessar a camera</Text>
            </View>
        )
    }

    return (
        <GluestackUIProvider config={config}>
            <View style={styles.container}>
                {scanned && <Text style={styles.url}>{scanned}</Text>}
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
                </View>
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
        marginTop: 670,

    },
    url: {
        width: "80%",
        textAlign: "center",
        backgroundColor: "red",
        borderRadius: 10,
        padding: 5,
        color: "white"
    },
    internButton: {

    }
});
