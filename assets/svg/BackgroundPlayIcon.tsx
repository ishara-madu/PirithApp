import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

type BackgroundPlayIconProps = {
    fill?: string;
}
function BackgroundPlayIcon(props : BackgroundPlayIconProps) {
  return (
    <Svg
      width={38}
      height={38}
      viewBox="0 0 38 38"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_6_165)" fill="#fff">
        <Path d="M9.5 4.75h14.234v2.375H9.5V4.75zM4.734 9.5H7.11v2.375H4.734V9.5zm0-4.75H7.11v2.375H4.734V4.75zm0 9.516h2.391v2.375h-2.39v-2.375z" />
        <Path d="M7.125 19h-4.75V2.36h23.75V9.5H28.5V3.167A3.167 3.167 0 0025.333 0H3.167A3.167 3.167 0 000 3.167v15.01a3.166 3.166 0 003.167 3.166h3.958V19z" />
        <Path d="M34.833 11.875H12.667A3.167 3.167 0 009.5 15.042v15.041a3.167 3.167 0 003.167 3.167h8.755v2.422H19V38h9.5v-2.36h-2.375v-2.39h8.708A3.167 3.167 0 0038 30.083V15.042a3.167 3.167 0 00-3.167-3.167zm.808 19H11.89V14.25h23.75v16.625z" />
      </G>
      <Defs>
        <ClipPath id="clip0_6_165">
          <Path fill="#fff" d="M0 0H38V38H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default BackgroundPlayIcon
