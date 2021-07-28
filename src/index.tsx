import { NativeModules } from 'react-native';

type MeasureTextSizeType = {
  multiply(a: number, b: number): Promise<number>;
};

const { MeasureTextSize } = NativeModules;

export default MeasureTextSize as MeasureTextSizeType;
