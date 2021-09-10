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
import { measureHeights } from '@bigbee.dev/react-native-measure-text-size';

const textSpec = {
  fontSize: 14,
  lineHeight: 14 * 1.9,
  // fontFamily: 'NotoSansMyanmar-Regular',
};

const width = 200;

export default function App() {
  const [heights, setHeights] = useState<number[]>([]);
  const texts = useMemo(
    () => [
      'Hello, gg',
      'မြန်မာစာ',
      '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင်',
      '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင် မြန်မာနိုင်ငံ',
      '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင် မြန်မာနိုင်ငံတော်ဗဟိုဘဏ်က ',
      '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင် မြန်မာနိုင်ငံတော်ဗဟိုဘဏ်က နိုင်ငံခြားငွေစျေးပြိုင်လေလံဖြင့် ဒေါ်လာသုံးသန်း ထပ်မံရောင်းချခဲ့ပြီး ဇူလိုင်လတစ်လနီးပါးတွင် ဒေါ်လာ ကိုးကြိမ်ရောင်းချခဲ့ပြီး ဒေါ်လာသန်း ၃၀ အထိ စံချိန်တင်ရောင်းချခဲ့ခြင်း ဖြစ်ကြောင်း သိရသည်။',
      '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင် မြန်မာနိုင်ငံတော်ဗဟိုဘဏ်က နိုင်ငံခြားငွေစျေးပြိုင်လေလံဖြင့် ဒေါ်လာသုံးသန်း ထပ်မံရောင်းချခဲ့ပြီး ဇူလိုင်လတစ်လနီးပါးတွင် ဒေါ်လာ ကိုးကြိမ်ရောင်းချခဲ့ပြီး ဒေါ်လာသန်း ၃၀ အထိ စံချိန်တင်ရောင်းချခဲ့ခြင်း ဖြစ်ကြောင်း သိရသည်။' +
        '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင် မြန်မာနိုင်ငံတော်ဗဟိုဘဏ်က နိုင်ငံခြားငွေစျေးပြိုင်လေလံဖြင့် ဒေါ်လာသုံးသန်း ထပ်မံရောင်းချခဲ့ပြီး ဇူလိုင်လတစ်လနီးပါးတွင် ဒေါ်လာ ကိုးကြိမ်ရောင်းချခဲ့ပြီး ဒေါ်လာသန်း ၃၀ အထိ စံချိန်တင်ရောင်းချခဲ့ခြင်း ဖြစ်ကြောင်း သိရသည်။',
      'For argument types not listed above, you will need to handle the conversion yourself. For example, in Android, Date conversion ',
      'For argument types not listed above, you will need to handle the conversion yourself. For example, in Android, Date conversion is not supported out of the box.',
      'For argument types not listed above, you will need to handle the conversion yourself. For example, in Android, Date conversion is not supported out of the box.' +
        'For argument types not listed above, you will need to handle the conversion yourself. For example, in Android, Date conversion is not supported out of the box.' +
        'For argument types not listed above, you will need to handle the conversion yourself. For example, in Android, Date conversion is not supported out of the box.',
    ],
    []
  );

  useEffect(() => {
    (async () => {
      const rr = await measureHeights({
        texts,
        width,
        ...textSpec,
      });

      setHeights(rr);
    })();
  }, [texts]);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <Text>Pixel Ratio (density): {PixelRatio.get()}</Text>
          <Text>Font scale: {PixelRatio.getFontScale()}</Text>
          <Text> Width: {PixelRatio.getPixelSizeForLayoutSize(200)}</Text>

          <Text>Text Result: {JSON.stringify(heights)}</Text>
          {heights.length > 0 &&
            texts.map((t, i) => (
              <View key={i} style={styles.textContainer}>
                <View
                  style={[
                    styles.textWrapper,
                    {
                      height: heights[i],
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
  },
  scrollContentContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: '#eee',
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    width,
    justifyContent: 'center',
  },
  text: {
    ...textSpec,
  },
});
