import * as React from "react"
import Svg, { Path } from "react-native-svg"

type SkipNextProps = {
    fill?: string;
}
function SkipNext(props : SkipNextProps) {
  return (
    <Svg
      width={20}
      height={22}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.25 21l12.5-10L1.25 1v20z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.75 19.75V2.25"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SkipNext
