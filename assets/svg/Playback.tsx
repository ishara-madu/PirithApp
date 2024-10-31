import * as React from "react"
import Svg, { Path } from "react-native-svg"


type PlaybackProps = {
  fill?: string;
  str: string;
}
function Playback(props : PlaybackProps) {
  return (
    <Svg
      width={38}
      height={38}
      viewBox="0 0 38 38"
      fill="none"
      {...props}
    >
      <Path
        d="M19 34.833c8.745 0 15.833-7.088 15.833-15.833 0-8.745-7.088-15.833-15.833-15.833M19 34.833c-8.745 0-15.833-7.088-15.833-15.833 0-8.745 7.088-15.833 15.833-15.833"
        stroke={props.str}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M24.405 17.323c1.237.732 1.237 2.622 0 3.354l-7.473 4.413c-1.203.709-2.682-.216-2.682-1.679V14.59c0-1.463 1.479-2.386 2.682-1.677l7.474 4.411z"
        stroke={props.str}
        strokeWidth={1.5}
      />
    </Svg>
  )
}

export default Playback
