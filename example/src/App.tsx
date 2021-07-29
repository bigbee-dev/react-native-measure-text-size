import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  PixelRatio,
  SafeAreaView,
} from 'react-native';
import MeasureTextSize from 'react-native-measure-text-size';

const fontSize = 14;

export default function App() {
  const [heights, setHeights] = useState<number[]>([]);
  const texts = useMemo(
    () => [
      'Hello, gg',
      'မြန်မာစာ',
      '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင် မြန်မာနိုင်ငံတော်ဗဟိုဘဏ်က နိုင်ငံခြားငွေစျေးပြိုင်လေလံဖြင့် ဒေါ်လာသုံးသန်း ထပ်မံရောင်းချခဲ့ပြီး ဇူလိုင်လတစ်လနီးပါးတွင် ဒေါ်လာ ကိုးကြိမ်ရောင်းချခဲ့ပြီး ဒေါ်လာသန်း ၃၀ အထိ စံချိန်တင်ရောင်းချခဲ့ခြင်း ဖြစ်ကြောင်း သိရသည်။',
      'For argument types not listed above, you will need to handle the conversion yourself. For example, in Android, Date conversion is not supported out of the box.',
    ],
    []
  );

  useEffect(() => {
    (async () => {
      const rr = await MeasureTextSize.heights({
        texts,
        width: 200,
        fontSize,
      });

      setHeights(rr);
    })();
  }, [texts]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <Text>Pixel Ratio (density): {PixelRatio.get()}</Text>
          <Text>Font scale: {PixelRatio.getFontScale()}</Text>
          <Text>
            Font 14 in px:{' '}
            {PixelRatio.roundToNearestPixel(
              PixelRatio.getPixelSizeForLayoutSize(14)
            )}
          </Text>

          <Text>Text Result: {JSON.stringify(heights)}</Text>
          {heights.length > 0 &&
            texts.map((t, i) => (
              <View key={i} style={styles.textContainer}>
                <View
                  style={[
                    styles.textWrapper,
                    {
                      height: heights[i] + 20,
                    },
                  ]}
                >
                  <Text style={[styles.text]}>{t}</Text>
                </View>
              </View>
            ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContentContainer: {
    paddingVertical: 20,
  },
  textContainer: {
    width: 220,
    flexDirection: 'row',
  },
  textWrapper: {
    backgroundColor: '#eee',
    borderRadius: 10,
    marginVertical: 4,
    padding: 10,
  },
  text: {
    textAlignVertical: 'center',
    fontSize,
  },
});
