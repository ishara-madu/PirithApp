import * as React from "react"
import Svg, { Path } from "react-native-svg"

type PlayerProps = {
  fill?: string;
  str: string;
}

function Player(props: PlayerProps) {
  return (
    <Svg
      width={38}
      height={38}
      viewBox="0 0 38 38"
      fill="none"
      {...props}
    >
      <Path
        d="M5.06 12.466h27.88m-7.912 0v-7.91m-12.056 7.91v-7.91m3.083 14.33v7.793a.8.8 0 00.144.453c.095.135.23.244.39.315a1.05 1.05 0 001.002-.09l6.013-4.196a.881.881 0 00.279-.315.785.785 0 00-.032-.78.9.9 0 00-.304-.294l-6.013-3.597a1.045 1.045 0 00-.976-.04.918.918 0 00-.367.314.791.791 0 00-.136.437z"
        stroke={props.str}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24.146 4.354H13.854a9.5 9.5 0 00-9.5 9.5v10.292a9.5 9.5 0 009.5 9.5h10.292a9.5 9.5 0 009.5-9.5V13.854a9.5 9.5 0 00-9.5-9.5z"
        stroke={props.str}
        strokeWidth={1.5}
      />
    </Svg>
  )
}

export default Player
