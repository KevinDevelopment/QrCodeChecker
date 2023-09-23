import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

type TParamsProps ={
    name: string
}

export function Scanner() {
    const route = useRoute();
    const { name } = route.params as TParamsProps;

    return (
        <View style={{ flex: 1, backgroundColor: "blue" }}>
            <Text>{ name }</Text>
        </View>
    );
}