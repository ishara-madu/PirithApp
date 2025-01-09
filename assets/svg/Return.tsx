import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

type ReturnProps = {
  fill?: string;
}

const Return = (props:ReturnProps) => {
  return (
    <Svg
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill="none"
    >
      <Path
        d="M4.5 1L1 4l3.5 3.5"
        stroke={props.fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1 4h11.497c3.441 0 6.364 2.81 6.498 6.25.142 3.635-2.861 6.75-6.498 6.75H3.999"
        stroke={props.fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Return