import React, { useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, CameraType } from 'expo-camera';

export function Scanner() {
    const navigation = useNavigation();
    const [type, setType] = useState(CameraType.back);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Urls escaneadas aparecerão aqui");
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [key, setKey] = useState(0)

    useFocusEffect(
        React.useCallback(() => {
            setScanned(false);
            setText("Urls escaneadas aparecerão aqui");
            setKey(prevKey => prevKey + 1); // Incrementa a chave para forçar a remontagem
        }, [])
    );

    useEffect(() => {
        setScanned(false)
    }, [])

    if (!permission) {
        return <View style={styles.container}><Text>Requisitando permissão...</Text></View>;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>Sem acesso à câmera</Text>
                <Button onPress={() => requestPermission()} title="Permitir Acesso" />
            </View>
        );
    }

    const handleBarCodeScanned = ({ type, data }: any) => {
        if (!scanned) {
            setScanned(true);
            setText(data);
            console.log(`A URL escaneada é ${data}`);
            navigation.navigate("scanned", { url: data });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>            
            <Camera
                key={key}
                style={{ flex: 1 }}
                type={type}
                onBarCodeScanned={handleBarCodeScanned}
                barCodeScannerSettings={{
                    barCodeTypes: [CameraType.back],
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.cornerTopLeft}></View>
                    <View style={styles.cornerTopRight}></View>
                    <View style={styles.cornerBottomLeft}></View>
                    <View style={styles.cornerBottomRight}></View>
                </View>               
            </Camera>
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
