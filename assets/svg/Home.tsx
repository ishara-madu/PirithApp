import * as React from "react"
import Svg, { Path } from "react-native-svg"


type HomeProps = {
  fill?: string;
}
function Home(props : HomeProps) {
  return (
    <Svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      {...props}
    >
      <Path
        d="M23.39 15.527h-5.237a2.624 2.624 0 00-2.625 2.612v5.237A2.625 2.625 0 0018.153 26h5.236A2.624 2.624 0 0026 23.376v-5.237a2.61 2.61 0 00-2.61-2.61m-14.543-.002H3.611A2.626 2.626 0 001 18.153v5.236A2.61 2.61 0 003.61 26h5.237a2.624 2.624 0 002.625-2.61v-5.237a2.625 2.625 0 00-2.625-2.625M8.847 1H3.611A2.61 2.61 0 001 3.61v5.237a2.624 2.624 0 002.61 2.625h5.237a2.625 2.625 0 002.625-2.625V3.611A2.624 2.624 0 008.847 1zM23.39 1h-5.236a2.624 2.624 0 00-2.625 2.61v5.237a2.625 2.625 0 002.625 2.625h5.236A2.624 2.624 0 0026 8.847V3.611A2.61 2.61 0 0023.39 1z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Home
