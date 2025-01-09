import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

interface LeftSkipProps {
    fill?: string;
}


const LeftSkip = (props:LeftSkipProps) => {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 40 40"
      fill="none"
    >
      <Path d="M20 5L0 20l20 15V5zm0 15l20 15V5L20 20z" fill={props.fill} />
    </Svg>
  )
}

export default LeftSkip