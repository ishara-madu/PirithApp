import * as React from "react"
import Svg, { Path } from "react-native-svg"


type RepeatProps = {
  opacity?: number;
}

function Repeat(props : RepeatProps) {
  return (
    <Svg
      width={18}
      height={22}
      viewBox="0 0 18 22"
      fill="none"
    >
      <Path
        d="M13.167 1.833L16.5 5.167 13.167 8.5"
        stroke="#fff"
        strokeOpacity={props.opacity}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.5 10.167V8.5a3.333 3.333 0 013.333-3.333H16.5M4.833 20.167L1.5 16.833 4.833 13.5"
        stroke="#fff"
        strokeOpacity={props.opacity}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.5 11.833V13.5a3.334 3.334 0 01-3.333 3.333H1.5"
        stroke="#fff"
        strokeOpacity={props.opacity}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Repeat
