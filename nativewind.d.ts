// nativewind.d.ts
import 'react-native';
import { ViewStyle, TextStyle, ImageStyle,TouchableOpacity } from 'react-native';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }

  interface TextProps {
    className?: string;
  }

  interface ImageProps {
    className?: string;
  }
  interface TouchableOpacityProps {
    className?: string;
  }
}
