import * as React from "react"
import Svg, { Path } from "react-native-svg"

type PlayProps = {
    fill?: string;
    w?: number;
    h?: number;
}

function Play(props : PlayProps) {
  return (
    <Svg
      width={props.w}
      height={props.h}
      viewBox="0 0 35 45"
      fill="none"
      {...props}
    >
      <Path
        d="M1 43.168V1.832L33.15 22.5 1 43.168z"
        fill={props.fill}
        stroke={props.fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Play
