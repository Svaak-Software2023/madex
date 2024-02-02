import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllWatchLater, deleteWatchLater, getAllWatchLater } from '../../redux/featurs/watchLater'
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from "react-toastify"
import Loading from '../../assets/loader/Loading';
import "./style.css"
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
    const data = useSelector((state) => state.watchLater.videoData)


    const dispatch = useDispatch()

    // create watch later get function 
    const feachData = () => {
        dispatch(getAllWatchLater())
    }

    // call watch later get function 
    useEffect(() => {
        feachData()
    }, [])

    // handle watch later single delete 
    const handleWatchLater = (videoId) => {
        dispatch(deleteWatchLater({ videoId, toast }))
        setTimeout(() => {
            feachData()
        }, 500);
    }

    // delete all handler 
    
    const userId=useSelector((state)=>state.auth.user._id)
    const deleteAllhandler=()=>{
        dispatch(deleteAllWatchLater({toast,userId}))
        setTimeout(() => {
            feachData()
        }, 500);
    }

    const watchtLoading = useSelector((state) => state.watchLater.loading)
    // if loading is true then show loading 
    if (watchtLoading) return <Loading />

    // if no records found then return this message 
    if (!data || data.length === 0) {
        return (
            <>
                <p className="h3 m-3">Watch History</p>
                <h4 className="text-center mt-5">No Watch Later Found</h4>
            </>
        );
    }


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
            <div className="clear-all-watch-later">

            <button  onClick={deleteAllhandler}>
                Clear All Watch Later
            </button>
            </div>
        </div>
    )
}
export default WatchLater