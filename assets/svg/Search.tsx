import * as React from "react"
import Svg, { Path } from "react-native-svg"


type SearchProps = {
    fill?: string;
}
function Search(props: SearchProps) {
    return (
        <Svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
        >
            <Path
                d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
                stroke={props.fill}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default Search
