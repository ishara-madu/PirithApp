import React from 'react'
import YoutubePlayer from "react-native-youtube-iframe";

type VideoProps = {
    isPlay: boolean;
  
}

const Video = ({isPlay}:VideoProps) => {
  return (
    <YoutubePlayer
              height={100}
              play={isPlay}
              videoId={"gRYV3Dgib7g"}
            />
  )
}

export default Video