import { NativeModules } from 'react-native';

export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type FontStyle = 'normal' | 'italic';

export interface MeasureOptions {
  texts: string[];
  width: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  lineHeight?: number;
}

const { MeasureTextSize } = NativeModules;
export function measureHeights(options: MeasureOptions): Promise<number[]> {
  return MeasureTextSize.heights(options);
}
