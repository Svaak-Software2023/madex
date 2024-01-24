import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminAuth({ children }) {
    return (
        <>
            {children}
            <Outlet />
        </>
    )
}

export default AdminAuth