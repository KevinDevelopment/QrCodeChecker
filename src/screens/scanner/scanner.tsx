import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export function Scanner() {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(true);
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }: any) => {
        setScanned(true);

        if (data.startsWith('http://') || data.startsWith('https://')) {

            Linking.openURL(data)
                .then(() => {
                    console.log(`Opened link: ${data}`);
                })
                .catch((error) => {
                    console.error(`Error opening link: ${data}`, error);
                    alert(`Error opening link: ${data}`);
                });
        } else {
            alert(`Bar code with type ${type} and data ${data} is not a link.`);
        }
    };

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.button}>
                <Button title={'Aperte aqui para escanear novamente'} onPress={() => setScanned(false)} />
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
