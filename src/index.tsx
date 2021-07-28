import { NativeModules } from 'react-native';

type MeasureTextSizeType = {
  heights(options: any): Promise<number[]>;
};

const { MeasureTextSize } = NativeModules;

export default MeasureTextSize as MeasureTextSizeType;
