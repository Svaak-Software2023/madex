import React, { useEffect, useRef } from 'react'
import "./style.css"
import { deleteNotification, getNotifications, updateNotification } from "../../redux/features/notificationSlice";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineDelete } from 'react-icons/md';
import moment from 'moment/moment';

function Notification({ notificationDropdown }) {

    const dispatch = useDispatch();
    const { notification: notificationData, countNotification, loading } = useSelector((state) => state.notification);

    // get Notification data 
    function featchNotification() {
        let accessToken = JSON.parse(localStorage.getItem('accessToken'))?.accessToken;
        if (accessToken) {
            let formData = { type: "subscribe", accessToken }
            dispatch(getNotifications(formData))
        }
    }

    // callNotificatonData 
    useEffect(() => {
        featchNotification()
    }, [])

    // update notification 
    useEffect(() => {
        console.log(notificationDropdown)
        let accessToken = JSON.parse(localStorage.getItem('accessToken'))?.accessToken;
        if (notificationDropdown && countNotification > 0) {
            setTimeout(() => {
                dispatch(updateNotification(accessToken)).then(() => {
                    featchNotification()
                })
            }, 500)
        }
    }, [notificationDropdown])

    // delete notifications 
    const deleteHandler = (id) => {
        let accessToken = JSON.parse(localStorage.getItem('accessToken'))?.accessToken;
        if (id && accessToken) {
            let formData = { id, accessToken}
            dispatch(deleteNotification(formData)).then(()=>{
                featchNotification()
            })
        }
    }


    const ref = useRef();

    // useEffect(() => {
    //     // Function to handle click outside of the div

    //     const handleClickOutside = (event) => {
    //         if (ref.current && !ref.current.contains(event.target)) {
    //             // Click occurred outside of the div
    //             setNotificationDropdown(false);
    //         }
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    //     // Clean up the event listener when component unmounts
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [ref]);
    return (
        <>
            {countNotification > 0 && <span className="notification-count">{countNotification}</span>}

            {notificationDropdown && <div className='notification_parent' ref={ref} >

                <div className="notification_main">
                    <h3>Notification</h3>
                    {loading
                        ?
                        <div className='d-flex justify-content-center w-100 py-5'>
                            <span className="spinner-border" role="status"></span>
                        </div>
                        :
                        notificationData.length ?
                            notificationData?.map((item, index) =>
                                item.isRead ? <div className="read_notification" key={index}>
                                    <div className="notification_details">
                                        <div className="notification_image">
                                            <img src="http://res.cloudinary.com/dwnsiyrzz/image/upload/v1711303160/i6menznywkni9k1k6raq.jpg" alt="user_image" />
                                        </div>
                                        <div className="notification_message">
                                            <p>{item?.message}</p>
                                            <span>{moment(item.createdAt).fromNow()}</span>
                                        </div>
                                        <div className="notification_delete_button">
                                            <MdOutlineDelete onClick={() => deleteHandler(item._id)} />
                                        </div>
                                    </div>
                                </div>
                                    :
                                    <div className="unread_notification" key={index}>
                                        <div className="notification_details">
                                            <div className="notification_image">
                                                <img src="http://res.cloudinary.com/dwnsiyrzz/image/upload/v1711303160/i6menznywkni9k1k6raq.jpg" alt="user_image" />
                                            </div>
                                            <div className="notification_message">
                                                <p>{item?.message}</p>
                                                <span>5 minuts ago</span>
                                            </div>
                                            <div className="notification_delete_button">
                                                <MdOutlineDelete onClick={() => deleteHandler(item._id)} />
                                            </div>
                                        </div>
                                    </div>
                            )
                            :
                            <div className='d-flex justify-content-center py-5'>
                                <div className="notification_message">
                                    <p>No Data</p>
                                </div>
                            </div>
                    }
                </div>
            </div>}
        </>
    )
}

export default Notification