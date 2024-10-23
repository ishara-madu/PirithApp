import * as React from "react"
import Svg, { Path } from "react-native-svg"


type DownArrowProps = {
  fill?: string;
  width: number;
  height: number;
}
function DownArrow(props : DownArrowProps) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 22 12"
      fill="none"
    >
      <Path
        d="M1 1l10 10L21 1"
        stroke={props.fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default DownArrow
