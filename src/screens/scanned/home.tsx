import { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, Image, Button } from "react-native"
import { api } from "../../utils/verify-url"

type Stats = {
  malicious: number;
  suspicious: number;
  undetected: number;
  harmless: number;
  timeout?: number; // Incluído como opcional, se for necessário
}

export function Scanned({ route }: any) {
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
          const { data } = await api.post("/url", {
            url
          })
          setAnalisyData(data?.data?.attributes?.stats)
          console.log(data?.data?.attributes?.stats)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [url])

  function classificaUrl(stats?: Stats): string {
    if (!stats) {
      return 'Dados não disponíveis'; // Ou outra mensagem apropriada
    }
  
    const maxKey = Object.keys(stats).reduce((a, b) => {
      const valA = stats[a as keyof Stats] ?? 0;
      const valB = stats[b as keyof Stats] ?? 0;
      return valA > valB ? a : b;
    }) as keyof Stats;
  
    switch (maxKey) {
      case 'malicious':
        return 'O site é malicioso!';
      case 'suspicious':
        return 'O site é suspeito!';
      case 'harmless':
        return 'O site é confiável!';
      case 'undetected':
      default:
        return 'Não Confiável';
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
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
          <View style={{ width: "95%", height: 66, display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#fafafa" }}>
            <Image
              source={require("../../../assets/checkmark-circle-24-filled.png")}
              style={{
                width: 30,
                height: 30,
                marginLeft: 24
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 16, color: "#008005", fontWeight: "bold" }}>{classificaUrl(analisyData)}</Text>
              <Text style={{ fontSize: 14 }}>Limpo: 10 | Suspeito: 0 | Perigoso: 0</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 30 }}>
          <View style={{ width: "95%" }}>
            <Button onPress={() => null} title="Novo Qr"></Button>
          </View>

          <View style={{ width: "95%", height: 58, marginTop: 10, backgroundColor: "#fafafa", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>url scaneada aqui</Text>
              <Text style={{ fontSize: 14 }}>Agora - <Text style={{ color: "#008005" }}>100% safe</Text></Text>
            </View>
            <View>
              <Image
                source={require("../../../assets/icon-size.png")}
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 24
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
} 