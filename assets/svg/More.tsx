import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg';

type MoreProps = {
    fill?: string;
}

const More = (props: MoreProps) => {
    return (
        <Svg
            width={4}
            height={19}
            viewBox="0 0 4 19"
            fill="none"
            {...props}
        >
            <Path
                d="M2 11c.552 0 1-.672 1-1.5S2.552 8 2 8s-1 .672-1 1.5.448 1.5 1 1.5zM2 3a1 1 0 100-2 1 1 0 000 2zM2 18a1 1 0 100-2 1 1 0 000 2z"
                stroke={props.fill}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default More