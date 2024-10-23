import * as React from "react"
import Svg, { Path } from "react-native-svg"

type SkipPreviewsProps ={
    fill?: string;
}

function SkipPreviews(props : SkipPreviewsProps) {
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
        d="M18.75 21L6.25 11l12.5-10v20z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.25 19.75V2.25"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SkipPreviews
