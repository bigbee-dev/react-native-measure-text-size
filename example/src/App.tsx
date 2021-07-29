import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import { StyleSheet, View, Text, ScrollView, PixelRatio } from 'react-native';
import MeasureTextSize from 'react-native-measure-text-size';

const fontSize = 14;

export default function App() {
  const [heights, setHeights] = useState<number[]>([]);
  const texts = useMemo(
    () => [
      'Hello, gg',
      'မြန်မာစာ',
      '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင် မြန်မာနိုင်ငံတော်ဗဟိုဘဏ်က နိုင်ငံခြားငွေစျေးပြိုင်လေလံဖြင့် ဒေါ်လာသုံးသန်း ထပ်မံရောင်းချခဲ့ပြီး ဇူလိုင်လတစ်လနီးပါးတွင် ဒေါ်လာ ကိုးကြိမ်ရောင်းချခဲ့ပြီး ဒေါ်လာသန်း ၃၀ အထိ စံချိန်တင်ရောင်းချခဲ့ခြင်းဖြစ်ကြောင်း သိရသည်။',
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
      <ScrollView>
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
            <Text
              style={[
                styles.text,
                {
                  height: heights[i],
                },
              ]}
              key={i}
            >
              {t}
            </Text>
          ))}
      </ScrollView>
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
  text: {
    borderWidth: StyleSheet.hairlineWidth,
    textAlignVertical: 'center',
    width: 200,
    fontSize,
  },
});
