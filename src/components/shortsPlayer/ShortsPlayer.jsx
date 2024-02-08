import React from 'react'
import "./style.css"
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
function ShortsPlayer({data}) {
const shortVideo=useSelector((state)=>state.video.singleVideo)
// console.log(shortVideo);
    return (
        <>
            <div style={{ width: "100%" }}>
                <ReactPlayer
                    url={shortVideo.videoFile}
                    controls
                    playing
                    width={300}
                    height={500}
                />
            </div>

        </>
    )
}

export default ShortsPlayer