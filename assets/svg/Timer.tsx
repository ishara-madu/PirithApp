import * as React from "react"
import Svg, { Path } from "react-native-svg"

type TimerProps = {
  fill?: string;
  str?:string;
}

function Timer(props : TimerProps) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 38 38"
      fill="none"
      {...props}
    >
      <Path
        d="M19 34.833c7.87 0 14.25-6.38 14.25-14.25S26.87 6.333 19 6.333s-14.25 6.38-14.25 14.25 6.38 14.25 14.25 14.25z"
        stroke={props.str}
        strokeWidth={1.5}
      />
      <Path
        d="M21.99 17.314c1.701 1.388 2.552 2.082 2.552 3.27 0 1.187-.85 1.88-2.553 3.269-.47.383-.935.744-1.364 1.045-.376.264-.802.537-1.242.804-1.699 1.033-2.547 1.549-3.309.977-.76-.57-.83-1.767-.969-4.16a35.32 35.32 0 01-.063-1.936c0-.595.025-1.258.063-1.934.14-2.395.209-3.59.969-4.162.762-.571 1.612-.055 3.31.977.44.268.865.54 1.24.805.428.3.895.662 1.365 1.045z"
        stroke={props.str}
        strokeWidth={1.5}
      />
      <Path
        d="M5.542 7.125l6.333-3.958m20.583 3.958l-6.333-3.958"
        stroke={props.str}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Timer
