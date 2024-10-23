import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

type HamburgerProps = {
    fill?: string;
}
function Hmaburger(props : HamburgerProps) {
    return (
        <Svg
            width={35}
            height={35}
            viewBox="0 0 35 35"
            fill="none"
        >
            <G clipPath="url(#clip0_2_104)">
                <Path
                    d="M29.167 25.52a2.188 2.188 0 01.21 4.366l-.21.01H5.833a2.188 2.188 0 01-.21-4.365l.21-.01h23.334zm0-10.207a2.188 2.188 0 010 4.374H5.833a2.188 2.188 0 010-4.375h23.334zm0-10.209a2.187 2.187 0 110 4.375H5.833a2.187 2.187 0 110-4.375h23.334z"
                    fill={props.fill}
                    fillOpacity={0.9}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_2_104">
                    <Path fill="#fff" d="M0 0H35V35H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default Hmaburger
