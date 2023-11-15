import React, { useTransition } from 'react';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TRouteParams = {
    url: string
}

type teste = {
    userId: number;
    title: string;
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFwcCB2aXJ1cyIsImlhdCI6MTUxNjIzOTAyMn0.SNDVwuHmpDi7-sZd-7LMTYOBnJASJaYGsFvqwwHisYk"

export function Scanned() {
    const [terminated, setTerminated] = useState<teste[]>([]);
    const [loading, setLoading] = useState<boolean>()
    const route = useRoute();
    const { url } = route.params as TRouteParams;

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const teste = await fetch("https://jsonplaceholder.typicode.com/posts", {
        //             method: "POST",
        //             // body: JSON.stringify({
        //             //     url: url
        //             // }),
        //             headers: {
        //                 'Content-type': 'application/json',
        //                 "authorization": `Bearer ${token}`
        //             }
        //         });
        //         console.log(teste);
        //         setTerminated("terminou");
        //     } catch (error) {
        //         setTerminated(String(error));
        //         console.error(error)
        //     }
        // }

        // fetchData();

        fetch("https://jsonplaceholder.typicode.com/posts", {
            headers: {
                'Content-type': 'application/json'                
            }
        })
            .then((resp) => resp.json())
            .then((json) => setTerminated(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SafeAreaView>
            <View>
                {
                    terminated.map((post) => {
                        return (
                          <View>                            
                            <Text>{post.title}</Text>
                          </View>
                        );
                      })
                }
            </View>
        </SafeAreaView>
    );
}
