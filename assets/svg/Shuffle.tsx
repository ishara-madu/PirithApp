import * as React from "react"
import Svg, { Path } from "react-native-svg"

type SvgComponentProps = {
    opacity?: number;
  
}

function Shiffle(props : SvgComponentProps) {
  return (
    <Svg
      width={17}
      height={18}
      viewBox="0 0 17 18"
      fill="none"
    >
      <Path
        d="M11.333 1.5H15.5v4.167M1.333 15.667L15.5 1.5M15.5 12.333V16.5h-4.167M10.5 11.5l5 5M1.333 2.333L5.5 6.5"
        stroke="#fff"
        strokeOpacity={props.opacity}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Shiffle
