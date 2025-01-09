import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Svg, { Path } from 'react-native-svg'


type HeartProps = {
    fill?: string;
    fillStr?: string;
}

const Heart = (props: HeartProps) => {
    

    return (
        <Svg
            width={20}
            height={21}
            viewBox="0 0 23 21"
            fill="none"
            {...props}
        >
            <Path
                d="M20.291 2.612a5.5 5.5 0 00-7.78 0l-1.06 1.06-1.06-1.06a5.501 5.501 0 00-7.78 7.78l1.06 1.06 7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                stroke={props.fillStr}
                fill={props.fill}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default Heart