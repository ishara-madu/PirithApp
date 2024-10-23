import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

type PauseProps = {
  fill?: string;
}

const Pause = (props: PauseProps) => {
  return (
    <Svg
      width={35}
      height={45}
      viewBox="0 0 35 45"
      fill="none"
      {...props}
    >
      <Path d="M0 0h5.833v45H0V0zm29.167 0H35v45h-5.833V0z" fill="#fff" />
    </Svg>
  )
}

export default Pause