import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import MeasureTextSize from 'react-native-measure-text-size';

export default function App() {
  const [result, setResult] = useState<number | undefined>();
  const [textResult, setTextResult] = useState<number[]>([]);

  React.useEffect(() => {
    (async () => {
      const texts = new Array(2000).fill('Hello world');

      const start = new Date().valueOf();
      await MeasureTextSize.heights({
        texts,
        width: 100,
      });
      const end = new Date().valueOf();
      setResult(end - start);
      console.log(`duration (ms): ${end - start}`);

      const rr = await MeasureTextSize.heights({
        texts: ['Hello', 'မြန်မာစာ', 'Hello'],
        width: 100,
      });

      setTextResult(rr);
    })();
  }, [setResult, setTextResult]);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Text>Text Result: {JSON.stringify(textResult)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
