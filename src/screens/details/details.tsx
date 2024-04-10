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

interface SimplifiedResult {
  engine_name: string;
  result: string;
}

export function Details({ route }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [antivirusData, setAntivirusData] = useState<AntivirusResults>({});
  const [simplifiedData, setSimplifiedData] = useState<SimplifiedResult[]>([]);
  const [analisyData, setAnalisyData] = useState<Stats>({
    harmless: 0,
    malicious: 0,
    suspicious: 0,
    undetected: 0
  })
  const { url } = route.params

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (url) {
  //         setIsLoading(true); // Inicia o carregamento
  //         const { data } = await api.post("/url", { url });
  //         setAntivirusData(data?.data?.attributes?.results)
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false); // Finaliza o carregamento
  //     }
  //   };
  //   fetchData();
  // }, [url]);

  
  useEffect(() => {
    setIsLoading(false)
  }, [])

  const resultTranslations: { [key: string]: string } = {
    "clean": "limpo",
    "malicious": "malicioso",
    "phishing": "phishing",
    "unrated": "não avaliado",
    // Adicione mais traduções conforme necessário
  };

  const createAntivirusArray = (antivirusResults: AntivirusResults) => {
    return Object.entries(antivirusResults)
      .filter(([_, result]) => result.category === 'malicious' || result.category === 'suspicious')
      .map(([_, { engine_name, result }]) => ({
        engine_name,
        result: resultTranslations[result] || result
      }));
  };

  const result = createAntivirusArray(antivirusData)
  console.log(result)

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


          <View style={{ width: "95%", padding: 12, height: 58, marginTop: 10, backgroundColor: "#fafafa", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text
                style={{ fontSize: 14, fontWeight: "bold" }}
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                {url}
              </Text>
            </View>
            <View style={{ display:"flex", flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../assets/icon-size.png")}
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 24
                }}
              />
              <Text>rererr</Text>
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