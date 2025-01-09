import * as React from "react"
import Svg, { Path } from "react-native-svg"

type SkipPreviewsProps ={
    fill?: string;
}

function SkipPreviews(props : SkipPreviewsProps) {
  return (
    <Svg
      width={16}
      height={18}
      viewBox="0 0 20 22"
      fill="none"
      {...props}
    >
      <Path
        d="M18.75 21L6.25 11l12.5-10v20z"
        fill={props.fill}
        stroke={props.fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.25 19.75V2.25"
        stroke={props.fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SkipPreviews
