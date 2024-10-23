import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg';

type ThemeIconProps ={
    fill?: string;
  
}

const ThemeIcon = (props : ThemeIconProps) => {
  return (
    <Svg
    width={38}
    height={38}
    viewBox="0 0 38 38"
    fill="none"
    {...props}
  >
    <Path
      d="M14.25 4.75a4.75 4.75 0 109.5 0h4.319l5.181 7.773-4.534 3.887v16.84H9.284V16.409L4.75 12.523 9.932 4.75h4.318z"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </Svg>
  )
}

export default ThemeIcon