import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

type ShareProps = {
    str?: string;
}

const Share = (props : ShareProps) => {
  return (
    <Svg
      width={20}
      height={19}
      viewBox="0 0 20 22"
      fill="none"
      {...props}
    >
      <Path
        d="M16 7a3 3 0 100-6 3 3 0 000 6zM4 14a3 3 0 100-6 3 3 0 000 6zM16 21a3 3 0 100-6 3 3 0 000 6zM6.59 12.51l6.83 3.98M13.41 5.51L6.59 9.49"
        stroke={props.str}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Share