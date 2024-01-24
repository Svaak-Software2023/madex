import React, { useEffect } from 'react'
import VideoList from '../../components/videoList/VideoList'
import CategoreyMenu from '../../components/categoreyMenu/CategoreyMenu'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVideo } from '../../redux/featurs/videoSlice'
import Loading from '../../assets/loader/Loading'
function SecondHome() {
  const dispatch = useDispatch()
  const video = useSelector((state) => state.video)

  useEffect(() => {
    dispatch(getAllVideo())
  }, [])

  if (video.loading) return <Loading />

  return (
    <>
      <div>
        <CategoreyMenu />
        {video.videoData
          ?
          <VideoList data={video.videoData} />
          :
          <h4 className='text-center mt-5'>Sorry, the video data could not be found</h4>
        }
      </div>
    </>
  )
}

export default SecondHome