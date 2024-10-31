import { View, Text } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg';


type ListProps = {
  str?: string;
}

const List = (props:ListProps) => {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 20 16"
      fill="none"
    >
      <Path
        d="M4 3L1 4.732V1.268L4 3z"
        stroke={props.str}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M1 9h18M8 3h11M1 15h18"
        stroke={props.str}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default List