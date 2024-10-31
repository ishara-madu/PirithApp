import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

interface RightSkipProps {
    fill?: string;
  
}

const RightSkip = (props:RightSkipProps) => {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
    >
      <Path d="M0 5v30l20-15L0 5zm20 15v15l20-15L20 5v15z" fill={props.fill} />
    </Svg>
  )
}

export default RightSkip