import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

type TRouteParams = {
  url: any;
};

type Result = {
  engine_name: string;
  category: string;
  result: string;
  method: string;
};

type AnalysisData = {
  meta: {
    url_info: {
      url: string;
      id: string;
    };
  };
  data: {
    attributes: {
      date: number;
      status: string;
      stats: {
        harmless: number;
        malicious: number;
        suspicious: number;
        undetected: number;
        timeout: number;
      };
      results: Record<string, Result>;
    };
    type: string;
    id: string;
    links: {
      item: string;
      self: string;
    };
  };
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFwcCB2aXJ1cyIsImlhdCI6MTUxNjIzOTAyMn0.SNDVwuHmpDi7-sZd-7LMTYOBnJASJaYGsFvqwwHisYk';

export function Scanned() {
  const [terminated, setTerminated] = useState<AnalysisData[]>([]);
  const route = useRoute();
  const { url } = route.params as TRouteParams;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(
          'https://security.hoxtak.com/url',
          { url: url },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(result.data.data);
        setTerminated(result.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View>
        {terminated?.map((item, index) => (
          <View key={index}>
            <Text>{`URL: ${item.meta.url_info.url}`}</Text>
            {/* <Text>{`ID: ${item.meta.url_info.id}`}</Text>
            <Text>{`Date: ${item.data.attributes.date}`}</Text> */}
            <Text>{`Status: ${item.data.attributes.status}`}</Text>
            <Text>{`Harmless: ${item.data.attributes.stats.harmless}`}</Text>
            <Text>{`Malicious: ${item.data.attributes.stats.malicious}`}</Text>
            <Text>{`Suspicious: ${item.data.attributes.stats.harmless}`}</Text>
            <Text>{`Undetected: ${item.data.attributes.stats.malicious}`}</Text>
            {/* Continue displaying other information as needed */}
            {/* <Text>Results:</Text>
            {Object.entries(item.data.attributes.results).map(
              ([engineName, result]) => (
                <View key={engineName}>
                  <Text>{`Engine Name: ${engineName}`}</Text>
                  <Text>{`Category: ${result.category}`}</Text>
                  <Text>{`Result: ${result.result}`}</Text>
                  <Text>{`Method: ${result.method}`}</Text>
                </View>
              )
            )} */}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
