import { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, Image, TouchableOpacity, Linking, Button } from 'react-native';
import { api } from "../../utils/verify-url"

type Stats = {
  malicious: number;
  suspicious: number;
  undetected: number;
  harmless: number;
  timeout?: number;
}

type AntivirusResult = {
  method: string;
  engine_name: string;
  category: string;
  result: string;
};

type AntivirusResults = {
  [key: string]: AntivirusResult;
};

export function Scanned({ route }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [antivirusData, setAntivirusData] = useState<AntivirusResults>({});
  const [analisyData, setAnalisyData] = useState<Stats>({
    harmless: 0,
    malicious: 0,
    suspicious: 0,
    undetected: 0
  })
  const { url } = route.params

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (url) {
          setIsLoading(true); // Inicia o carregamento
          const { data } = await api.post("/url", { url });
          setAnalisyData(data?.data?.attributes?.stats);
          setAntivirusData(data?.data?.attributes?.results)
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Finaliza o carregamento
      }
    };
    fetchData();
  }, [url]);

  type StatusType = 'confiavel' | 'nao-confiavel' | 'perigoso' | 'nao-disponivel';

  const colorMap = {
    confiavel: '#008005', // Verde para confiável
    "nao-confiavel": '#FFA500', // Amarelo para não confiável
    perigoso: '#B20000', // Vermelho para perigoso
    "nao-disponivel": '#000000' // Preto para dados não disponíveis
  };

  function verifyUrl(stats: Stats): { status: StatusType, message: string } {
    if (!stats) {
      return { status: 'nao-disponivel', message: 'Dados não disponíveis' };
    }

    if (stats.malicious > 0) {
      return { status: 'perigoso', message: 'O site é perigoso!' };
    }

    if (stats.suspicious === 0) {
      return { status: 'confiavel', message: 'O site é confiável!' };
    } else if (stats.suspicious <= 5) {
      return { status: 'nao-confiavel', message: 'O site não é confiável.' };
    } else {
      return { status: 'perigoso', message: 'O site é perigoso!' };
    }
  }

  // Em seu componente
  const { status, message } = verifyUrl(analisyData);

  const imageMap = {
    confiavel: require("../../../assets/checkmark-circle-24-filled.png"), // Exemplo de imagem para status confiável
    "nao-confiavel": require("../../../assets/Subtract.png"), // Exemplo de imagem para status não confiável
    perigoso: require("../../../assets/Group.png"), // Exemplo de imagem para status perigoso
    "nao-disponivel": require("../../../assets/Group.png") // Imagem padrão ou para dados não disponíveis
  }
  const statusImage = imageMap[status];

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
      {isLoading ? (
        <View style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../../../assets/ZZ5H.gif")}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <Text>Analisando url...</Text>
        </View>
      ) : (
        <View style={{ width: "100%", height: "100%" }}>
          <View style={{ width: "100%", height: "10%", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: "40%", paddingLeft: 19 }}>
              <Image
                source={require("../../../assets/arrow-back.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
            <View style={{ width: "60%" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>QR CODE</Text>
            </View>
          </View>

          <View style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 21 }}>
            <Image
              source={require("../../../assets/Rectangle13.png")}
              style={{
                width: 200,
                height: 200,
              }}
            />
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>{url}</Text>
          </View>

          <View style={{ width: "100%", alignItems: "center", marginTop: 24 }}>
            <View style={{ width: "95%", height: 66, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#fafafa" }}>
              <Image
                source={statusImage}
                style={{
                  width: 30,
                  height: 30
                }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, color: colorMap[status], fontWeight: "bold" }}>{message}</Text>
                {/* <Text style={{ fontSize: 14 }}>Limpo: {analisyData?.harmless} | Suspeito: {analisyData?.suspicious}  | Perigoso: {analisyData?.malicious}</Text> */}
              </View>
            </View>
          </View>

          <View style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 30 }}>
            <View style={{ width: "95%" }}>
              <Button onPress={() => null} title="Novo Qr"></Button>
            </View>

            <View style={{ width: "95%", height: 58, marginTop: 10, backgroundColor: "#fafafa", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold" }}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  {url}
                </Text>
              </View>
              <TouchableOpacity onPress={() => Linking.openURL(url)}>
                <Image
                  source={require("../../../assets/icon-size.png")}
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 24
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

    </SafeAreaView>
  )
} 