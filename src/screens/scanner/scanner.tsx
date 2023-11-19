import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
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
        navigation.navigate("scanned", { url: data });
    };

    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <Text>Conceda permissão pra acessar a camera</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text>{scanned}</Text>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                style={StyleSheet.absoluteFillObject}
                aria-modal
            />
            <View style={styles.button}>
               { scanned && <Button title={'Aperte aqui para escanear novamente'} onPress={() => setScanned(false)} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    button: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 670,
        borderRadius: 10
    }
});
