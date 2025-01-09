import { View, Text } from 'react-native';
import React from 'react';
import { Svg, Rect, Path } from 'react-native-svg';

type ArrowProps = {
    fill: string;
}

const Arrow = (props : ArrowProps) => {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <Rect width="30" height="30" rx="10" fill="none" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7421 9.35664C15.5059 9.60938 15.5068 10.0183 15.7439 10.2699L19.5933 14.3541H8.93931L8.85707 14.36C8.56125 14.4028 8.33325 14.673 8.33325 14.9999C8.33325 15.3566 8.60459 15.6457 8.93931 15.6457H19.592L15.7439 19.7298L15.6851 19.8021C15.5086 20.0545 15.5274 20.4133 15.7421 20.6431C15.9783 20.8958 16.3621 20.8966 16.5992 20.645L21.4738 15.4721C21.5873 15.3593 21.66 15.2006 21.666 15.0238C21.6721 14.8501 21.6128 14.6742 21.488 14.5418L16.5992 9.35467L16.5311 9.2923C16.2934 9.10526 15.9568 9.12687 15.7421 9.35664Z"
        fill={props.fill}
      />
    </Svg>
  );
};

export default Arrow;
