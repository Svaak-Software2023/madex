import React, { useEffect, useState } from 'react'
import VideoList from '../../components/videoList/VideoList'
import { useDispatch, useSelector } from 'react-redux'
import { getDownload } from '../../redux/featurs/downloads';
import { Link } from 'react-router-dom';
import Loading from '../../assets/loader/Loading';

function Downloads() {
    const dispatch = useDispatch();

    const download = useSelector((state) => state.downloads.videoData)

    useEffect(() => {
        dispatch(getDownload())
    }, [])


    const isSidebarOpen = useSelector((state) => state.globalFunction.isMenuOpen);

    const style = {
        width: isSidebarOpen ? "calc(100%/3)" : "calc(100%/4)"
    }
    return (
        <>
            <div className="m-3">
                <h3 className=''>Downloads</h3>
            </div>
            {download ? <div className="video-list-main">

                {download.map((item, i) =>
                    <div div key={i} className="video-list" style={style} >
                        <Link to={`/video/${item.video._id}`}>
                            <div className="video-item">
                                <img
                                    src={item.video.thumbnail}
                                    alt={item.video.title}
                                    className='img-fluid'
                                />
                                <span>{item.video.duration}</span>
                            </div>
                        </Link>
                        <div className="video-details">
                            {item.video.channelData && <div className="video-logo-img">

                                <img
                                    src={item.video.channelData.owner.avatar}
                                    alt=""
                                />
                            </div>}
                            <div className="video-name">
                                <Link to={`/video/${item._id}`}>
                                    <h3>
                                        {item.video.title}
                                    </h3>
                                </Link>
                                {item.video.channelData && <p>{item.video.channelData.channelName}</p>}
                                <p>Time: {item.video.createdAt}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
                : <h3 className='text-center pt-5 mt-5'>Sorry, no data found !</h3>}
        </>
    )
}

export default Downloads