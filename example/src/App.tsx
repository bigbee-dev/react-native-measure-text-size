import { measureHeights } from '@bigbee.dev/react-native-measure-text-size';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  PixelRatio,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const textSpec = {
  fontSize: 14,
  lineHeight: 14 * 1.9,
  // fontFamily: 'NotoSansMyanmar-Regular',
};

const width = 275;

const normalizeText = (text: string) => {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .join('\n');
};

const renderLines = (heights: number[], texts: string[], maxLines?: number) => {
  return (
    <>
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
              <Text style={[styles.text]} numberOfLines={maxLines}>
                {t}
              </Text>
            </View>
          </View>
        ))}
    </>
  );
};

export default function App() {
  const [heights, setHeights] = useState<number[]>([]);
  const [twoLinesHeights, setTwoLinesHeights] = useState<number[]>([]);

  const texts = useMemo(
    () =>
      [
        '                                                အရှည် >>၃၀"',
        '                                                Absentcolandcolarejlkjdf',
        '                                                 အရှည် >>၃၀"',
        `၀မ်းဆက် တစ်စုံ>>၉၈၀၀ကျပ်

         �ဆိုဒ်>၂ နှစ် / ၄ နှစ် / ၆ နှစ် / ၈ နှစ် /၁၀ နှစ်/ ၁၂ နှစ်
         
         ၂နှစ်>>အင်္ကျီ=ရင်ပတ်လည်>>၂၄"
                                         အရှည်>>၁၄"ခွဲ
         
                        ဘောင်းဘီ=ခါး >>၂၂"-၂၄"
                                                အရှည်>>၁၈"
         
         ၄နှစ်>>အင်္ကျီ=ရင်ပတ်လည်>>၂၆"
                                        အရှည်>>၁၇"
         
                        ဘောင်းဘီ=ခါး>>၂၄"-၂၆"
                                               အရှည်>>၂၂"
         
         ၆နှစ်>>အင်္ကျီ=ရင်ပတ်လည်>>၂၈"
                                        အရှည်>>၁၈"ခွဲ
         
                          ဘောင်းဘီ=ခါး >>၂၆"-၂၈"
                                                အရှည်>>၂၄"
         
         ၈နှစ်>>အင်္ကျီ=ရင်ပတ်လည်>>၃၀"
                                        အရှည်>>၂၀"
         
                       ဘောင်းဘီ=ခါး >>၂၈"-၃၀"
                                               အရှည်>>၂၇"
         
         ၁၀နှစ်>>အင်္ကျီ=ရင်ပတ်လည်>>၃၂"
                                           အရှည်>>၂၂"
         
                           ဘောင်းဘီ=ခါး >>၃၀"-၃၂"
                                                 အရှည် >>၃၀"`,
        '၀မ်းဆက် တစ်စုံ>>၉၈၀၀ကျပ်\n�ဆိုဒ်>၂ နှစ် / ၄ နှစ် / ၆ နှစ် / ၈ နှစ် /၁၀ နှစ်/ ၁၂ နှစ်\n၂နှစ်>>အင်္ကျီ=ရင်ပတ်လည်>>၂၄',
        'Hello, gg',
        'မြန်မာစာ',
        '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင်',
        '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင် မြန်မာနိုင်ငံ',
        '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင် မြန်မာနိုင်ငံတော်ဗဟိုဘဏ်က ',
        '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင် မြန်မာနိုင်ငံတော်ဗဟိုဘဏ်က နိုင်ငံခြားငွေစျေးပြိုင်လေလံဖြင့် ဒေါ်လာသုံးသန်း ထပ်မံရောင်းချခဲ့ပြီး ဇူလိုင်လတစ်လနီးပါးတွင် ဒေါ်လာ ကိုးကြိမ်ရောင်းချခဲ့ပြီး ဒေါ်လာသန်း ၃၀ အထိ စံချိန်တင်ရောင်းချခဲ့ခြင်း ဖြစ်ကြောင်း သိရသည်။',
        '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင် မြန်မာနိုင်ငံတော်ဗဟိုဘဏ်က နိုင်ငံခြားငွေစျေးပြိုင်လေလံဖြင့် ဒေါ်လာသုံးသန်း ထပ်မံရောင်းချခဲ့ပြီး ဇူလိုင်လတစ်လနီးပါးတွင် ဒေါ်လာ ကိုးကြိမ်ရောင်းချခဲ့ပြီး ဒေါ်လာသန်း ၃၀ အထိ စံချိန်တင်ရောင်းချခဲ့ခြင်း ဖြစ်ကြောင်း သိရသည်။' +
          '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင် မြန်မာနိုင်ငံတော်ဗဟိုဘဏ်က နိုင်ငံခြားငွေစျေးပြိုင်လေလံဖြင့် ဒေါ်လာသုံးသန်း ထပ်မံရောင်းချခဲ့ပြီး ဇူလိုင်လတစ်လနီးပါးတွင် ဒေါ်လာ ကိုးကြိမ်ရောင်းချခဲ့ပြီး ဒေါ်လာသန်း ၃၀ အထိ စံချိန်တင်ရောင်းချခဲ့ခြင်း ဖြစ်ကြောင်း သိရသည်။',
        'မြိုင်မြိုင်ဆိုင်ဆိုင်ဒုတိယအကြိမ်ပရိုမိုးရှင်း! *71111#ကိုခေါ်ပြီး MPT Special Flash အစီအစဉ်မှာ စာရင်းသွင်းပါဝင်ရုံနဲ့ အထူးလက်ဆောင်ကံထူးနိုင်ပြီ။ ၁၁-၁၁-၂၀၂၁ ရက်နေ့ MPT Special Day အစီအစဉ် ရဲ့ ပရိုမိုးရှင်းတွေ မှာပါဝင်ဖို့ ရင်ခုန်စောင့်မျှော်လိုက်ကြစို့။ ကံထူးနိုင်မည့် အထူးလက်ဆောင်အရေအတွက်ကန့်သတ်ထားတာမို့ အခုပဲမြန်မြန်ခေါ်ဆိုလိုက်ကြရအောင်။ https://bit.ly/3jExNyo “အတူလက်တွဲအမြဲရှိမည် MPT”။မြိုင်မြိုင်ဆိုင်ဆိုင်ဒုတိယအကြိမ်ပရိုမိုးရှင်း! *71111#ကိုခေါ်ပြီး MPT Special Flash အစီအစဉ်မှာ စာရင်းသွင်းပါဝင်ရုံနဲ့ အထူးလက်ဆောင်ကံထူးနိုင်ပြီ။ ၁၁-၁၁-၂၀၂၁ ရက်နေ့ MPT Special Day အစီအစဉ် ရဲ့ ပရိုမိုးရှင်းတွေ မှာပါဝင်ဖို့ ရင်ခုန်စောင့်မျှော်လိုက်ကြစို့။ ကံထူးနိုင်မည့် အထူးလက်ဆောင်အရေအတွက်ကန့်သတ်ထားတာမို့ အခုပဲမြန်မြန်ခေါ်ဆိုလိုက်ကြရအောင်။ https://bit.ly/3jExNyo “အတူလက်တွဲအမြဲရှိမည် MPT”။',
        'For argument types not listed above, you will need to handle the conversion yourself. For example, in Android, Date conversion ',
        'For argument types not listed above, you will need to handle the conversion yourself. For example, in Android, Date conversion is not supported out of the box.',
        'For argument types not listed above, you will need to handle the conversion yourself. For example, in Android, Date conversion is not supported out of the box.' +
          'For argument types not listed above, you will need to handle the conversion yourself. For example, in Android, Date conversion is not supported out of the box.' +
          `For argument types not listed above,
         you will need to handle the conversion yourself. For example, in Android, Date conversion is not supported out of the box.`,
        `၀မ်းဆက် တစ်စုံ>>၉၈၀၀ကျပ်

         �ဆိုဒ်>၂ နှစ် / ၄ နှစ် / ၆ နှစ် / ၈ နှစ် /၁၀ နှစ်/ ၁၂ နှစ်
         
         ၂နှစ်>>အင်္ကျီ=ရင်ပတ်လည်>>၂၄"
                                         အရှည်>>၁၄"ခွဲ
         
                        ဘောင်းဘီ=ခါး >>၂၂"-၂၄"
                                                အရှည်>>၁၈"
         
         ၄နှစ်>>အင်္ကျီ=ရင်ပတ်လည်>>၂၆"
                                        အရှည်>>၁၇"
         
                        ဘောင်းဘီ=ခါး>>၂၄"-၂၆"
                                               အရှည်>>၂၂"
         
         ၆နှစ်>>အင်္ကျီ=ရင်ပတ်လည်>>၂၈"
                                        အရှည်>>၁၈"ခွဲ
         
                          ဘောင်းဘီ=ခါး >>၂၆"-၂၈"
                                                အရှည်>>၂၄"
         
         ၈နှစ်>>အင်္ကျီ=ရင်ပတ်လည်>>၃၀"
                                        အရှည်>>၂၀"
         
                       ဘောင်းဘီ=ခါး >>၂၈"-၃၀"
                                               အရှည်>>၂၇"
         
         ၁၀နှစ်>>အင်္ကျီ=ရင်ပတ်လည်>>၃၂"
                                           အရှည်>>၂၂"
         
                           ဘောင်းဘီ=ခါး >>၃၀"-၃၂"
                                                 အရှည် >>၃၀"
         
         ၁၂နှစ်>>အင်္ကျီ=ရင်ပတ်လည် >>၃၁"-၃၂"ခွဲ
                                             အရှည်>>၂၃"ခွဲ
         
                             ဘောင်းဘီ=ခါး>>၃၂"-၃၄"
                                                  အရှည်>>၃၃”
         
         ဒီဇိုင်း၄မျိုးရှိပါတယ်ရှင့်။`,
      ].map(normalizeText),
    []
  );

  const twoLinesTexts = useMemo(
    () =>
      [
        '၂၀၂၁ ခုနှစ် ဇူလိုင် ၂၇ ရက်တွင် မြန်မာနိုင်ငံတော်ဗဟိုဘဏ်က နိုင်ငံခြားငွေစျေးပြိုင်လေလံဖြင့် ဒေါ်လာသုံးသန်း ထပ်မံရောင်းချခဲ့ပြီး ဇူလိုင်လတစ်လနီးပါးတွင် ဒေါ်လာ ကိုးကြိမ်ရောင်းချခဲ့ပြီး ဒေါ်လာသန်း ၃၀ အထိ စံချိန်တင်ရောင်းချခဲ့ခြင်း ဖြစ်ကြောင်း သိရသည်။',
        `For argument types not listed above,
       you will need to handle the conversion yourself. For example, in Android, Date conversion is not supported out of the box.`,
      ].map(normalizeText),
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

      const rr2 = await measureHeights({
        texts: twoLinesTexts,
        maxLines: 2,
        width,
        ...textSpec,
      });

      setTwoLinesHeights(rr2);
    })();
  }, [texts, twoLinesTexts]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Text>Pixel Ratio (density): {PixelRatio.get()}</Text>
        <Text>Font scale: {PixelRatio.getFontScale()}</Text>
        <Text> Width: {PixelRatio.getPixelSizeForLayoutSize(200)}</Text>

        <Text>Text Result: {JSON.stringify(heights)}</Text>
        {renderLines(heights, texts)}
        {renderLines(twoLinesHeights, twoLinesTexts, 2)}
      </ScrollView>
    </SafeAreaView>
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
    overflow: 'hidden',
  },
  text: {
    ...textSpec,
  },
});
