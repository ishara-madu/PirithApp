import * as React from "react"
import Svg, { Path } from "react-native-svg"

type PlayProps = {
    fill?: string;
}

function Play(props : PlayProps) {
  return (
    <Svg
      width={35}
      height={45}
      viewBox="0 0 35 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1 43.168V1.832L33.15 22.5 1 43.168z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Play
