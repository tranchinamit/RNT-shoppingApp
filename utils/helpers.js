import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import Colors from '../constants/Colors';

export const bAndroidOS = Platform.OS === 'android';

export const colorBasedOnOS = Platform.OS !== "ios" ? "white" : Colors.primary;
export const colorBgBasedOnOS = Platform.OS !== "ios" ? Colors.primary : "white";

export const bAndroidOSTouchable = Platform.OS === 'android' && Platform.Version >= 21;

export const TouchableCmp = bAndroidOSTouchable ? TouchableNativeFeedback : TouchableOpacity;
