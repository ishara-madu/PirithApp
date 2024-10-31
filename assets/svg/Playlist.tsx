import * as React from "react"
import Svg, { Path } from "react-native-svg"

type PlaylistProps = {
    fill?: string;
}

function Playlist(props : PlaylistProps) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
    >
      <Path
        d="M1 1h25.2M1 11.316h18.2M1 21.632h9.8m12.95 2.947c0 2.442-1.96 4.421-4.375 4.421S15 27.02 15 24.579c0-2.442 1.96-4.421 4.375-4.421s4.375 1.98 4.375 4.42zm0 0V11.316c.584.884 1.05 4.598 5.25 5.305"
        stroke={props.fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Playlist
