import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWatchLater, getAllWatchLater } from '../../redux/featurs/watchLater'
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from "react-toastify"
import Loading from '../../assets/loader/Loading';
function WatchLater() {
    const isSidebarOpen = useSelector((state) => state.globalFunction.isMenuOpen);
    const style = {
        width: isSidebarOpen ? "calc(100%/3)" : "calc(100%/4)"
    }

    // more option state 
    const [more, setMore] = useState(null)

    // handle more option 
    const openMore = (id) => {
        if (!more) {
            setMore(id)
        }
        else {
            setMore(null)
        }
    }

    // get Watch later data from the store 
    const videoData = useSelector((state) => state.watchLater.videoData)
    const [data, setData] = useState([])

    // call watch later get function 
    const dispatch = useDispatch()
    const feachData = () => {
        dispatch(getAllWatchLater())
    }

    useEffect(() => {
        feachData()
        setData(videoData)
    }, [])

    useEffect(() => {
        feachData()
        setData(videoData)
        console.log(data)
    }, [data.length, videoData.length])

    // handle watch later single delete 
    const handleWatchLater = (videoId) => {
        dispatch(deleteWatchLater({ videoId, toast }))
        setData(data.filter((item) => item.video._id !== videoId))
    }

    const watchtLoading = useSelector((state) => state.watchLater.loading)
    if (watchtLoading) return <Loading/>

    return (
        <div>
            <div className="m-3">
                <h3 className=''>Watch Later</h3>
            </div>

            <div className="video-list-main">
                {data && data.map((item, i) =>
                    <div div key={i} className="video-list" style={style}>
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
                                <Link to={`/video/${item.video._id}`}>
                                    <h3>
                                        {item.video.title}
                                    </h3>
                                </Link>
                                {item.video.channelData && <p>{item.video.channelData.channelName}</p>}
                                <p>{item.video.views} views 3 hours ago</p>
                            </div>
                            <div className='video-more-option-button'><BsThreeDotsVertical onClick={() => openMore(item.video._id)} />
                                {more === item.video._id && <div className='video-more-option'>
                                    <ul>
                                        <li onClick={() => handleWatchLater(item.video._id)}>Remove watch later</li>
                                    </ul>
                                </div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default WatchLater