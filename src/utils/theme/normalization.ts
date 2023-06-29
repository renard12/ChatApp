import {
  GUIDELINE_BASE_HEIGHT,
  GUIDELINE_BASE_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from 'constants/sizes';
import { Platform, StatusBar } from 'react-native';

export const scaleFontSize = (fontSize: number): number => {
  const standardLength =
    SCREEN_WIDTH > SCREEN_HEIGHT ? SCREEN_WIDTH : SCREEN_HEIGHT;
  const offset =
    SCREEN_WIDTH > SCREEN_HEIGHT ? 0 : StatusBar?.currentHeight ?? 0;

  const deviceHeight =
    Platform.OS === 'android' ? standardLength - offset : standardLength;

  const heightPercent = (fontSize * deviceHeight) / GUIDELINE_BASE_HEIGHT;
  return Math.round(heightPercent);
};

export const scaleByWidth = (size: number) => {
  return (SCREEN_WIDTH / GUIDELINE_BASE_WIDTH) * size;
};
export const scaleByHeight = (size: number) => {
  return (SCREEN_HEIGHT / GUIDELINE_BASE_HEIGHT) * size;
};
