import * as React from "react"
import Svg, { Path } from "react-native-svg"

type SkipNextProps = {
    fill?: string;
}
function SkipNext(props : SkipNextProps) {
  return (
    <Svg
      width={16}
      height={18}
      viewBox="0 0 20 22"
      fill="none"
      {...props}
    >
      <Path
        d="M1.25 21l12.5-10L1.25 1v20z"
        fill={props.fill}
        stroke={props.fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.75 19.75V2.25"
        stroke={props.fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SkipNext
