import * as React from "react"
import Svg, { Path } from "react-native-svg"


type RateProps = {
    fill?: string;
}
function Rate(props: RateProps) {
    return (
        <Svg
            width={23}
            height={22}
            viewBox="0 0 28 27"
            fill="none"
        >
            <Path
                d="M5.266 16.514h3.428l8.196-8.198c.133-.153.233-.314.3-.482a1.231 1.231 0 00-.005-.994 1.968 1.968 0 00-.295-.475l-1.43-1.477a1.3 1.3 0 00-.464-.3 1.355 1.355 0 00-1.02 0 1.69 1.69 0 00-.485.3l-8.225 8.197v3.429zm1.375-1.378v-1.478l5.363-5.364.719.76.73.748-5.335 5.334H6.641zm6.082-6.083l.73.749-1.447-1.51.717.761zm.98 7.46h9.033v-1.556H15.26l-1.557 1.555zM0 26.563V2.514C0 1.797.24 1.199.72.72 1.2.241 1.798.001 2.512 0h22.976c.715 0 1.313.24 1.792.72.479.48.719 1.078.72 1.794v16.752c0 .715-.24 1.313-.72 1.793s-1.078.72-1.792.719H4.786L0 26.564zm4.122-6.342h21.366c.238 0 .458-.1.658-.298.2-.2.3-.419.298-.658V2.512c0-.238-.1-.458-.298-.658-.2-.2-.419-.3-.658-.298H2.512c-.238 0-.458.1-.658.298-.2.2-.3.419-.298.658v20.27l2.566-2.56z"
                fill={props.fill}
            />
        </Svg>
    )
}

export default Rate