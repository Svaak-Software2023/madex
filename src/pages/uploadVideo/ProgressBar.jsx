import React, { useEffect, useState } from 'react'
import "./upload.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function ProgressBar({ percentage }) {
    return (
        <div className="loader-top">
            <div className="loader-main">
                <div>
                    <div className="d-flex justify-content-center mb-3">
                        <div className="loader"></div>
                    </div>
                    <p className='text-center'>Video uploading...</p>
                    <div className="progress video-upload-progress-bar" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{ width: `${percentage}%` }}>{percentage}%</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar